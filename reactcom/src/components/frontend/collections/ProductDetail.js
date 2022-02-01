import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import swal from "sweetalert";

function ProductDetail(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isMountered = true;
    const category_slug = props.match.params.category;
    const product_name = props.match.params.product;
    axios
      .get(`/api/viewproductdetails/${category_slug}/${product_name}`)
      .then((res) => {
        if (isMountered) {
          if (res.data.status === 200) {
            setProduct(res.data.product);
            setLoading(false);
          } else if (res.data.status === 404) {
            history.push("/collections");
            swal("Warning", res.data.message, "error");
          }
        }
      });

    return () => {
      isMountered = false;
    };
  }, [props.match.params.category, props.match.params.product, history]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };
  const submitAddtoCart = (e) => {
    e.preventDefault();
    const data = {
      product_id: product.id,
      product_qty: quantity,
    };
    axios.post(`api/add-to-cart`, data).then((res) => {
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
          Loading Product Detail...
        </Button>
      </h4>
    );
  } else {
    var avail_stock = "";
    if (product.qty > 0) {
      avail_stock = (
        <div>
          <label className="btn-sm btn-success">In Stock</label>
          <div className="row">
            <div className="col-md-6 mt-4">
              <div className="input-group">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="input-group-text"
                >
                  -
                </button>
                <div className="form-control text-center">{quantity}</div>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="input-group-text"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      avail_stock = (
        <div>
          <label>Out Of Stock</label>
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
          <li className="breadcrumb-item ">
            <Link className="text-decoration-none" to="/Collections">
              {product.category.name}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link className="text-decoration-none" to="/collections">
              {product.slug}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/#" className="text-decoration-none">
              {product.name}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-8">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <span className="float-start badge btn-sm btn-danger badge-pil">
                {product.brand}
              </span>
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
                className="w-100 img-fluid mb-3"
              />
            </div>
            <div className="col-md-7">
              <h1 className="h5 d-inline mr-2">{product.description}</h1>
              <span className="badge bg-success mr-2">New</span>
              <span className="badge bg-danger mr-2">Hot</span>
              <div className="mb-3">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="text-warning mr-1"
                  fill="currentColor"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="text-warning mr-1"
                  fill="currentColor"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="text-warning mr-1"
                  fill="currentColor"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="text-warning mr-1"
                  fill="currentColor"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="text-secondary mr-1"
                  fill="currentColor"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
              </div>
              <dl className="row small mb-3">
                <dt className="col-sm-3">Sold by</dt>
                <dd className="col-sm-9">Authorised Store</dd>
                <dd className="col-sm-9">{avail_stock}</dd>
              </dl>
              <div className="mb-3">
                <span className="font-weight-bold h5 mr-2 px-1">
                  ${product.selling_price}
                </span>
                <del className="small text-muted mr-2 px-1">
                  ${product.original_price}
                </del>
                <span className="rounded p-1 bg-warning mr-2 small">
                  -{product.original_price - product.selling_price}$
                </span>
              </div>
              <div className="mb-3">
                <button
                  onClick={submitAddtoCart}
                  type="button"
                  className="btn btn-sm btn-primary px-4"
                  title="Add to cart"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="cart-plus"
                    className="svg-inline--fa fa-cart-plus fa-w-18 "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z"
                    ></path>
                  </svg>
                  Add to cart
                </button>
                <button
                  onClick={submitAddtoWishlist}
                  type="button"
                  className="btn btn-sm btn-outline-danger px-4 mx-4"
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
                  Add to wishlist
                </button>
              </div>
              <div>
                <p className="font-weight-bold">Product Highlights</p>
                <ul className="small">
                  <li>Brand : {product.brand}</li>
                  <li>Featured : {product.description}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4 border-end"></div>
        <div className="col-md-8"></div>
      </div>
    </div>
  );
}

export default ProductDetail;
