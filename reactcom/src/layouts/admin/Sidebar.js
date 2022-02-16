import React from "react";
import { Link } from "react-router-dom";
import {} from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import {
  AiOutlineDashboard,
  AiOutlineOrderedList,
  AiOutlineContacts,
} from "react-icons/ai";
import { BiCategoryAlt, BiUser } from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading"></div>
            <Link className="header__menu mobile-menu" to="/admin/dashboard">
              <ul>
                <li>
                  <Link
                    className="text-decoration-none text-white"
                    to="/admin/dashboard"
                  >
                    <AiOutlineDashboard /> Dashboard
                  </Link>
                </li>
              </ul>
            </Link>
            <nav className="header__menu mobile-menu">
              <ul>
                <li>
                  <Link className="text-decoration-none text-white" to="#">
                    <BiCategoryAlt /> Category
                  </Link>
                  <ul className="dropdown">
                    <li>
                      <Link
                        className="nav-link text-white"
                        to="/admin/add-category"
                      >
                        <div className="sb-nav-link-icon"></div>
                        Add Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="nav-link text-white"
                        to="/admin/view-category"
                      >
                        <div className="sb-nav-link-icon"></div>
                        View Category
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <nav className="header__menu mobile-menu">
              <ul>
                <li>
                  <Link className="text-decoration-none text-white" to="#">
                    <FaProductHunt />
                    Product
                  </Link>
                  <ul className="dropdown">
                    <li>
                      <Link
                        className="nav-link text-white"
                        to="/admin/add-product"
                      >
                        Add Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="nav-link text-white"
                        to="/admin/view-product"
                      >
                        View Product
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <Link className="header__menu mobile-menu" to="/admin/orders">
              <ul>
                <li>
                  <Link
                    className="text-decoration-none text-white"
                    to="/admin/orders"
                  >
                    <AiOutlineOrderedList /> Orders
                  </Link>
                </li>
              </ul>
            </Link>
            <Link className="header__menu mobile-menu" to="/admin/users">
              <ul>
                <li>
                  <Link
                    className="text-decoration-none text-white"
                    to="/admin/users"
                  >
                    <BiUser /> Users
                  </Link>
                </li>
              </ul>
            </Link>
            <Link className="header__menu mobile-menu" to="/admin/contact">
              <ul>
                <li>
                  <Link
                    className="text-decoration-none text-white"
                    to="/admin/contact"
                  >
                    <AiOutlineContacts /> Contact
                  </Link>
                </li>
              </ul>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
