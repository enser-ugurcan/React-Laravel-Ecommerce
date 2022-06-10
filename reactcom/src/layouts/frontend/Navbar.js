import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import "./navbar.css";
import $ from "jquery";
import { useEffect } from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FcSearch } from "react-icons/fc";
import { Trans, useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import { Dropdown } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";

import { useTheme, useThemeUpdate } from "../../Contexts/CurrencyContext";
import GlobalContext from "../../Contexts/GlobalContext";

function Navbar() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState([]);
  const [language, setLanguage] = useState([]);
  const [flag, setFlage] = useState(false);
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  const globalContext = useContext(GlobalContext);

  // const themeStyles = {
  //   backgroundColor: darkTheme ? "red" : "blue",
  // };
  useEffect(() => {
    let isMountered = true;
    axios.get(`/api/getCategory?lang=${globalContext.language}`).then((res) => {
      //  console.log(`/api/getCategory?lang=${globalContext.language}`);
      if (isMountered) {
        if (res.data.status === 200) {
          setCategory(res.data.categories);
        }
      }
    });
    return () => {
      isMountered = false;
    };
  }, [globalContext.language]);

  const handleInput = (e) => {
    e.persist();
    setCart({ ...cart, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    let isMountered = true;

    axios.get(`/api/cart`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
        } else if (res.data.status === 401) {
          history.push("/");
          swal("Warning", res.data.message, "error");
        }
      }
    });
  }, [history]);
  $(document).ready(function () {
    // executes when HTML-Document is loaded and DOM is ready

    // breakpoint and up
    $(window).resize(function () {
      if ($(window).width() >= 980) {
        // when you hover a toggle show its dropdown menu
        $(".navbar .dropdown-toggle").hover(function () {
          $(this).parent().toggleClass("show");
          $(this).parent().find(".dropdown-menu").toggleClass("show");
        });

        // hide the menu when the mouse leaves the dropdown
        $(".navbar .dropdown-menu").mouseleave(function () {
          $(this).removeClass("show");
        });

        // do something here
      }
    });

    // document ready
  });
  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        history.push("/");
      }
    });
  };

  const { t, i18n } = useTranslation();
  const ChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const countcart = cart.length;
  var totalPrice = 0;
  var discount = 0;
  var Result = 0;
  useEffect(() => {
    axios.get("/api/language").then((res) => {
      if (res.data.status === 200) {
        setLanguage(res.data.languages);

        //console.log(res.data.languages);
      }
    });
  }, []);

  var AuthButton = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButton = (
      <div className="row">
        <div className="col-md-8">
          <div className="position-relative d-inline">
            <Link className="btn btn-outline text-dark" to="/login">
              <Trans i18nKey="description.part1">Login</Trans>
            </Link>

            <Link className="btn btn-outline text-dark" to="/register">
              <Trans i18nKey="description.part1">Register</Trans>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    AuthButton = (
      <div className="row">
        <div className="col-md-8">
          <div className="position-relative d-inline mr-3">
            <nav className="header__menu mobile-menu">
              <ul>
                <li>
                  <Link className="text-decoration-none" to="#">
                    <FaRegUser />
                  </Link>
                  <ul className="dropdown">
                    <li>
                      <Link to="/profile">
                        {" "}
                        <Trans i18nKey="description.part1">Profile Info</Trans>
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders">My Orders</Link>
                    </li>
                    <li>
                      <Link to="/help">Help</Link>
                    </li>
                    <li>
                      <Link type="button" onClick={logoutSubmit}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }

  var languagelist = "";
  if (loading) {
    languagelist = language.map((item) => {
      return (
        <li>
          <button
            type="button"
            onClick={() => {
              globalContext.changeLanguage(item.name);
              changeLanguage(item.name);
              setShow({ show: true });
            }}
            className="btn btn-sm btn-succes"
          >
            <Link>{item.name}</Link>
          </button>
        </li>
      );
    });
  }
  var showCategoryList = "";

  if (loading) {
    showCategoryList = category.map((item) => {
      var categoryImg = item.category_descriptions.find((x) => {
        return x.language.name === globalContext.language;
      }).description;
      return (
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle text-dark"
            to="#"
            id={`${item.id}-navbardropdown`}
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {
              item.category_descriptions.find((x) => {
                return x.language.name === globalContext.language;
              }).title
            }
          </Link>
          {
            <div
              className="dropdown-menu"
              aria-labelledby={`${item.id}-navbardropdown`}
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-7">
                    {item?.children_categories.map((sub_category) => {
                      return (
                        <>
                          <span className="text-white">
                            <Link
                              className="nav-link"
                              to={`/collections/${
                                sub_category.category_descriptions.find((x) => {
                                  return (
                                    x.language.name === globalContext.language
                                  );
                                }).category_id
                              }`}
                            >
                              {
                                sub_category.category_descriptions.find((x) => {
                                  return (
                                    x.language.name === globalContext.language
                                  );
                                }).title
                              }
                            </Link>
                          </span>
                          <ul className="nav flex-column">
                            {sub_category?.categories.map((sub_item) => {
                              return (
                                <li className="nav-item">
                                  <Link
                                    className="nav-link"
                                    to={`/collections/${sub_item.category_id}`}
                                  >
                                    {sub_item.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      );
                    })}
                  </div>
                  <div className="col-md-5">{ReactHtmlParser(categoryImg)}</div>
                </div>
              </div>
            </div>
          }
        </li>
      );

      // return (
      //   <div className="float-start px-5" key={item.id}>
      //     <Link
      //       className="text-center text-decoration-none"
      //       to={`collections/${item.name}`}
      //     >
      //       <h5>{item.name}</h5>
      //     </Link>
      //   </div>
      // );
    });
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse d-flex justify-content-end "
            id="navbarSupportedContent"
          >
            <div className="row mt-3">
              <div className="col">
                <nav className="header__menu mobile-menu">
                  <ul>
                    <li className="align-items-start">
                      <Link className="text-decoration-none" to="#">
                        Currency
                      </Link>
                      <ul className="dropdown">
                        <li>
                          <button
                            onClick={() => toggleTheme("EUR")}
                            type="button"
                            className="btn btn-sm text-light px-3 mb-1"
                          >
                            € EU Euro
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => toggleTheme("USD")}
                            type="button"
                            className="btn btn-sm text-light px-3 mb-1"
                          >
                            $ US Dollar
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => toggleTheme("TRY")}
                            type="button"
                            className="btn btn-sm text-light px-3 mb-1"
                          >
                            ₺ TR TRY
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col"></div>
              <div className="col">
                {" "}
                <nav className="header__menu mobile-menu">
                  <ul>
                    <li>
                      <Link className="text-decoration-none" to="#">
                        Language
                      </Link>
                      <ul className="dropdown">{languagelist}</ul>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col"></div>
              <div className="col"></div>

              {/* <button
              type="button"
              onClick={() => {
                globalContext.changeLanguage("tr");
                changeLanguage("tr");
                setShow({ show: true });
              }}
              className="btn btn-sm btn-primary px-4"
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => {
                globalContext.changeLanguage("eng");
                changeLanguage("en");
                setShow({ show: false });
              }}
              className="btn btn-sm btn-primary px-4"
            >
              ENG
            </button> */}
            </div>

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <Trans i18nKey="top_navbar.contact">Contact</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  <Trans i18nKey="top_navbar.about">About</Trans>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="p-3 border-bottom bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-md-3 text-center">
              <div className="logo_container">
                <Link to="/">
                  BE<span>FA</span>
                </Link>
              </div>
            </div>
            <div className="col-md-5">
              <form className="d-flex">
                <div className="input-group">
                  <input
                    id="search"
                    name="search"
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    required
                  />
                  <button className="btn btn-outline-primary" type="submit">
                    <FcSearch />
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <div className="position-relative d-inline mr-3 col-md-3">
                {AuthButton}
              </div>
              <div className="position-relative d-inline mr-3 col-md-3">
                <Link className="btn btn-light" to="/wishlist">
                  <FaRegHeart />
                  <div className="position-absolute top-0 left-100 translate-middle badge bg-danger rounded-circle"></div>
                </Link>
              </div>
              <div className="position-relative d-inline mr-3 col-md-3">
                <div class="header-right">
                  <ul>
                    <li>
                      <Link to="/cart">
                        <HiOutlineShoppingCart />
                      </Link>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fas fa-search"></i>
                      </a>
                      <div class="search-box">
                        <form action="#">
                          <input type="text" placeholder="Search" />
                          <button>
                            <i class="fas fa-search"></i>
                          </button>
                        </form>
                      </div>
                    </li>
                  </ul>
                </div>

                <Link className="btn btn-light" to="/cart">
                  <div className="position-absolute top-0 left-100 translate-middle badge bg-danger rounded-circle">
                    {}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <nav className="navbar navbar-expand-lg navbar-white bg-light p-0">
        <div className="container-fluid justify-content-center">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="container d-flex justify-content-center ">
              <div className="row">
                <div className="col-lg-12 col-md-6">
                  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div
                      className="collapse navbar-collapse bg-light"
                      id="navbarSupportedContent"
                    >
                      <ul className="navbar-nav mr-auto">
                        {showCategoryList}
                        {/* <li className="nav-item dropdown">
                          <Link
                            className="nav-link dropdown-toggle text-dark"
                            to="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            
                            <Trans i18nKey="navbarItems.Computer&TabletItems.Laptop">
                              {" "}
                              Electronic
                            </Trans>
                          </Link>
                          {
                            <div
                              className="dropdown-menu"
                              aria-labelledby="navbarDropdown"
                            >
                              <div className="container">
                                <div className="row">
                                  <div className="col-md-3">
                                    <span className="text-white">
                                      <Trans i18nKey="navbarItems.Computer&Tablet">
                                        {" "}
                                        Computer & Tablet
                                      </Trans>
                                    </span>
                                    <ul className="nav flex-column">
                                      <li className="nav-item">
                                        <Link
                                          className="nav-link"
                                          to="/collections/Laptop"
                                        >
                                          {" "}
                                          <Trans i18nKey="navbarItems.Computer&TabletItems.Laptop">
                                            {" "}
                                            Laptop
                                          </Trans>
                                        </Link>
                                      </li>
                                    </ul>
                                    <ul className="nav flex-column">
                                      <li className="nav-item">
                                        <Link
                                          className="nav-link"
                                          to="/collections/Tablet"
                                        >
                                          Tablet
                                        </Link>
                                      </li>
                                    </ul>
                                    <ul className="nav flex-column">
                                      <li className="nav-item">
                                        <Link
                                          className="nav-link"
                                          to="/collections/Monitor"
                                        >
                                          Monitor
                                        </Link>
                                      </li>
                                    </ul>
                                    <span className="text-white">
                                      <Trans i18nKey="navbarItems.Phone">
                                        {" "}
                                        Phone
                                      </Trans>
                                    </span>
                                    <ul className="nav flex-column">
                                      <li className="nav-item">
                                        <Link
                                          className="nav-link"
                                          to="/collections/Mobile"
                                        >
                                          <Trans i18nKey="navbarItems.PhoneItems.MobilePhone">
                                            {" "}
                                            Mobile Phone
                                          </Trans>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-md-3">
                                    <span className="text-white">
                                      <Trans i18nKey="navbarItems.TV">
                                        {" "}
                                        TV & Image & Sound
                                      </Trans>
                                    </span>
                                    <ul className="nav flex-column">
                                      <li className="nav-item">
                                        <Link
                                          className="nav-link"
                                          to="/collections/Television"
                                        >
                                          <Trans i18nKey="navbarItems.TvItems.Television">
                                            {" "}
                                            Television
                                          </Trans>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="col-md-4">
                                    <Link to="/collections/Tablet">
                                      <img src="https://e-commerce-template.surge.sh/images/banner/Tablets.webp" />
                                      <br />
                                      <br />
                                    </Link>
                                    <Link to="/collections/Television">
                                      <img src="https://cdn.dsmcdn.com/ty284/pimWidgetApi/mobile_20211231072316_2160174ElektronikMobile202112301601.jpg" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                        </li> */}
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
