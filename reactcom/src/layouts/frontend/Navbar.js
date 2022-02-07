import React from "react";
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

function Navbar() {
  const [cart, setCart] = useState([]);
  const history = useHistory();
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
  const CartCount = cart.count;

  var totalPrice = 0;
  var discount = 0;
  var Result = 0;

  var AuthButton = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButton = (
      <div className="row">
        <div className="col-md-8">
          <div className="position-relative d-inline">
            <Link className="btn btn-outline text-dark" to="/login">
              Login
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
                      <Link to="/profile">Profile İnfo</Link>
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
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse d-flex justify-content-end "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
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
                      <div class="card-hover p-3">
                        <table class="table table-dark table-hover table-bordered">
                          <thead>
                            <tr>
                              <th class="h-100">image</th>
                              <th>name</th>
                              <th>price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart.map((item, idx) => {
                              totalPrice +=
                                item.product.selling_price * item.product_qty;
                              discount = (totalPrice * 10) / 100;
                              Result = totalPrice - discount;
                              return (
                                <tr key={idx}>
                                  <td>
                                    <img
                                      src={`http://localhost:8000/${item.product.image}`}
                                      alt={item.product.name}
                                      width="50px"
                                      height="50px"
                                    />
                                  </td>
                                  <td>
                                    <p className="text-white">
                                      {item.product.name}
                                    </p>
                                    <small className="text-white">
                                      Brand:{item.product.brand}
                                    </small>
                                  </td>
                                  <td>
                                    ${item.product.selling_price}
                                    <br />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <div class="total-price clearfix">
                          <span class="float-left total-left">Total:</span>
                          <span class="float-right total-right">
                            $ {Result}
                          </span>
                        </div>
                        <a href="" class="check-out-botton">
                          Check out
                        </a>
                      </div>
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
                    {CartCount}
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
                        <li className="nav-item dropdown">
                          <Link
                            className="nav-link dropdown-toggle text-dark"
                            to="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Men
                          </Link>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <div className="container">
                              <div className="row">
                                <div className="col-md-3">
                                  <span className="text-white">Clothes</span>
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        to="/collections/T-Shirt"
                                      >
                                        T-Shirt
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
                                  <span className="text-white">Phone</span>
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        to="/collections/Mobile"
                                      >
                                        Mobile Phone
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-md-3">
                                  <span className="text-white">
                                    TV & Image & Sound
                                  </span>
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        to="/collections/Television"
                                      >
                                        Television
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-2">
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
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
                        </li>
                        <li className="nav-item dropdown">
                          <Link
                            className="nav-link dropdown-toggle text-dark"
                            to="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Women
                          </Link>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <div className="container">
                              <div className="row">
                                <div className="col-md-4">
                                  <span className="text-uppercase text-white">
                                    Category 2
                                  </span>
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-4">
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-4">
                                  <Link to="">
                                    <img
                                      src="https://dummyimage.com/200x100/ccc/000&text=image+link"
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </Link>
                                  <p className="text-white">
                                    Short image call to action
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item dropdown">
                          <Link
                            className="nav-link dropdown-toggle text-dark"
                            to="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Furniture
                          </Link>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <div className="container">
                              <div className="row">
                                <div className="col-md-4">
                                  <span className="text-uppercase text-white">
                                    Category 3
                                  </span>
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-4">
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-4">
                                  <Link to="">
                                    <img
                                      src="https://dummyimage.com/200x100/ccc/000&text=image+link"
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </Link>
                                  <p className="text-white">
                                    Short image call to action
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item dropdown">
                          <Link
                            className="nav-link dropdown-toggle text-dark"
                            to="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Fashion
                          </Link>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <div className="container">
                              <div className="row">
                                <div className="col-md-4">
                                  <span className="text-uppercase text-white">
                                    Category 3
                                  </span>
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-4">
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-4">
                                  <Link to="">
                                    <img
                                      src="https://dummyimage.com/200x100/ccc/000&text=image+link"
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </Link>
                                  <p className="text-white">
                                    Short image call to action
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item dropdown">
                          <Link
                            className="nav-link dropdown-toggle text-dark"
                            to="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Garden & Outdoors
                          </Link>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <div className="container">
                              <div className="row">
                                <div className="col-md-4">
                                  <span className="text-uppercase text-white">
                                    Category 3
                                  </span>
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-4">
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-4">
                                  <Link to="">
                                    <img
                                      src="https://dummyimage.com/200x100/ccc/000&text=image+link"
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </Link>
                                  <p className="text-white">
                                    Short image call to action
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item dropdown">
                          <Link
                            className="nav-link dropdown-toggle text-dark"
                            to="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Jewellery
                          </Link>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <div className="container">
                              <div className="row">
                                <div className="col-md-4">
                                  <span className="text-uppercase text-white">
                                    Category 3
                                  </span>
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-4">
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-4">
                                  <Link to="">
                                    <img
                                      src="https://dummyimage.com/200x100/ccc/000&text=image+link"
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </Link>
                                  <p className="text-white">
                                    Short image call to action
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item dropdown">
                          <Link
                            className="nav-link dropdown-toggle text-dark"
                            to="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Electronic
                          </Link>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <div className="container">
                              <div className="row">
                                <div className="col-md-3">
                                  <span className="text-white">
                                    Computer & Tablet
                                  </span>
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        to="/collections/Laptop"
                                      >
                                        Laptop
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
                                  <span className="text-white">Phone</span>
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        to="/collections/Mobile"
                                      >
                                        Mobile Phone
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-md-3">
                                  <span className="text-white">
                                    TV & Image & Sound
                                  </span>
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        to="/collections/Television"
                                      >
                                        Television
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                <div className="col-md-2">
                                  <ul className="nav flex-column">
                                    <li className="nav-item">
                                      <Link className="nav-link active" to="#">
                                        Active
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link className="nav-link" to="#">
                                        Link item
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
                        </li>
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
