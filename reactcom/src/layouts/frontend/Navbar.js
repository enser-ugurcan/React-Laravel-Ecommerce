import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import "./navbar.css";
import $ from "jquery";

function Navbar() {
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
  const history = useHistory();
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

  var AuthButton = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButton = (
      <div className="row">
        <div className="col-md-8">
          <div className="position-relative d-inline mr-3">
            <Link className="btn btn-outline-primary" to="/login">
              Login
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="position-relative d-inline mr-3">
            <Link className="btn btn-warning " to="/register">
              Register
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
                  <Link icon={faUser} className="text-decoration-none" to="#">
                    Account
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
                    {" "}
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-4 d-flex justify-content-start">
              <div className="position-relative d-inline mr-3 col-md-2">
                <Link className="btn btn-primary" to="/cart">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="i-va"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                    ></path>
                  </svg>

                  <div className="position-absolute top-0 left-100 translate-middle badge bg-danger rounded-circle">
                    {}
                  </div>
                </Link>
              </div>
              <div className="position-relative d-inline mr-3 col-md-2">
                <Link className="btn btn-outline-light" to="/wishlist">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="text-danger"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    ></path>
                  </svg>
                  <div className="position-absolute top-0 left-100 translate-middle badge bg-danger rounded-circle"></div>
                </Link>
              </div>
              <div className="btn-group col-md-2">{AuthButton}</div>
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
                        <li className="nav-item dropdown ">
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
                                <div className="col-md-4">
                                  <span className="text-uppercase text-white">
                                    Category 1
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
                                  <Link to="               ">
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
