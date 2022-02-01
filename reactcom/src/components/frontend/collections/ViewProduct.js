import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";
import "./style.css";

function ViewProduct(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const productCount = product.length;

  useEffect(() => {
    let isMountered = true;
    const product_slug = props.match.params.slug;
    axios.get(`/api/fetchproducts/${product_slug}`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setProduct(res.data.product_data.product);
          setCategory(res.data.product_data.category);
          setLoading(false);
        } else if (res.data.status === 400) {
          swal("Warning", res.data.message, "");
        } else if (res.data.status === 404) {
          history.push("/collections");
          swal("Warning", res.data.message, "error");
        }
      }
    });

    return () => {
      isMountered = false;
    };
  }, [props.match.params.slug, history]);

  const submitAddtoWishlist = (e) => {
    e.preventDefault();
    const data = {
      product_id: product.id,
      product_qty: quantity,
    };
    axios.post(`api/add-to-wishlist`, data).then((res) => {
      if (res.data.status === 201) {
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        swal("Warning", res.data.message, "warning");
      } else if (res.data.status === 401) {
        swal("Error", res.data.message, "error");
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "warning");
      }
    });
  };
  if (loading) {
    return (
      <h4>
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading Category...
        </Button>
      </h4>
    );
  } else {
    var showProductList = "";
    if (productCount) {
      showProductList = product.map((item, idx) => {
        return (
          <div className="col-md-4" key={idx}>
            <div className="card">
              <div className="card h-100 shadow-sm">
                <Link to={`/collections/${item.category.slug}/${item.name}`}>
                  <img
                    src={`http://localhost:8000/${item.image}`}
                    className="mx-auto d-block w-50"
                    alt={item.name}
                  />
                </Link>
                <div className="label-top shadow-sm">
                  <Link
                    to={`/collections/${item.category.slug}/${item.name}`}
                    className="text-white text-decoration-none"
                  >
                    Kargo Bedava
                  </Link>
                </div>
                <div className="top-right">
                  <button
                    onClick={submitAddtoWishlist}
                    type="button"
                    className="btn btn-sm btn-outline-warning rounded-circle"
                    title="Add to wishlist"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="heart"
                      className="svg-inline--fa fa-heart fa-w-16 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="card-body">
                  <div className="clearfix mb-3">
                    <h5 className="card-title">
                      <Link
                        to={`/collections/${item.category.slug}/${item.name}`}
                      >
                        {item.description}
                      </Link>
                    </h5>
                    <span className="float-start badge rounded-pill bg-success">
                      {item.selling_price}$
                    </span>
                    <del className="small text-muted float-start badge rounded-pill">
                      {item.original_price}$
                    </del>
                  </div>

                  <div className="d-grid gap-2 my-4">
                    <Link
                      to={`/collections/${item.category.slug}/${item.name}`}
                      className="btn btn-warning bold-btn"
                    >
                      View Product
                    </Link>
                  </div>
                  <div className="clearfix mb-1">
                    <span className="float-start">
                      <Link to="/#">
                        <i className="fas fa-question-circle"></i>
                      </Link>
                    </span>

                    <span className="float-end">
                      <i className="far fa-heart"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      showProductList = (
        <div className="col-md-12">
          <h4>No Product Available for {category.name}</h4>
        </div>
      );
    }
  }
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="bg-warning breadcrumb rounded-0 px-3 py-2">
          <li className="breadcrumb-item ">
            <Link className="text-decoration-none" to="/">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link className="text-decoration-none" to="/Collections">
              {category.name}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/#" className="text-decoration-none">
              {category.slug}
            </Link>
          </li>
        </ol>
      </nav>
      <div className="container-fluid mb-3">
        <div className="row">
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-header font-weight-bold text-uppercase">
                Related categories
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Link to="/#" className="text-decoration-none stretched-link">
                    {category.slug}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-8">
                <span className="align-middle font-weight-bold ">
                  {productCount} result for
                  <span className="text-warning mx-2">"{category.slug}"</span>
                </span>
              </div>
              <div className="col-md-4">
                <select
                  className="form-select w-50 float-left"
                  aria-label="Default select"
                >
                  <option value="1">Most Popular</option>
                  <option value="2">Latest items</option>
                  <option value="3">Price low to high</option>
                  <option value="4">Price high to low</option>
                </select>
              </div>
            </div>
            <hr />
            <div className="row g-4">{showProductList}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
