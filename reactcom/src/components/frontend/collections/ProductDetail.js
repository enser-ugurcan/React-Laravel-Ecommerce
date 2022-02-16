import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import swal from "sweetalert";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import ImageZoom from "react-image-zooom";

function ProductDetail(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [products, setProductt] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setCart({ ...cart, [e.target.name]: e.target.value });
  };

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
            setProductt(res.data.products);
            console.log(res.data.products);
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
  const productCount = product.length;
  const image = `http://localhost:8000/${product.image}`;
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
  var showProductList = "";
  if (true) {
    showProductList = products.map((item, idx) => {
      return (
        <div class="row mb-3" key={idx}>
          <div class="col-md-4">
            <Link to={`/collections/${item.category.slug}/${item.name}`}>
              <img
                src={`http://localhost:8000/${item.image}`}
                className="mx-auto d-block w-100"
                alt={item.name}
              />
            </Link>
          </div>
          <div class="col-md-8">
            <h6 class="text-capitalize mb-1">{item.name}</h6>
            <span class="font-weight-bold h5">${item.selling_price}</span>
            <del class="small text-muted mx-2">${item.original_price}</del>
          </div>
        </div>
      );
    });
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
            <Link
              className="text-decoration-none"
              to={`/collections/${product.slug}`}
            >
              {product.slug}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link className="text-decoration-none">{product.name}</Link>
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-8 mx-5">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <span className="float-start badge btn-sm btn-danger badge-pil">
                {product.brand}
              </span>
              <ImageZoom
                src={`http://localhost:8000/${product.image}`}
                alt="A image to apply the ImageZoom plugin"
                zoom="200"
              />
              <ImageZoom
                src={`http://localhost:8000/${product.image}`}
                class="border border-secondary mr-2"
                width="75"
                alt="..."
              />
              <ImageZoom
                src={`http://localhost:8000/${product.image}`}
                class="border border-secondary mr-2"
                width="75"
                alt="..."
              />
              <ImageZoom
                src={`http://localhost:8000/${product.image}`}
                class="border border-secondary mr-2"
                width="75"
                alt="..."
              />
            </div>
            <div className="col-md-7">
              <h1 className="h5 d-inline mr-2">{product.description}</h1>
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
                  onChange={handleInput}
                  type="button"
                  className="btn btn-sm btn-primary px-4"
                  title="Add to cart"
                >
                  <HiOutlineShoppingCart />
                  Add to cart
                </button>
                <button
                  onClick={submitAddtoWishlist}
                  onChange={handleInput}
                  type="button"
                  className="btn btn-sm btn-outline-danger px-4 mx-4"
                  title="Add to wishlist"
                >
                  <FaRegHeart />
                  Add to wishlist
                </button>
              </div>
              <div>
                <p className="font-weight-bold">Product Highlights</p>
                <ul className="small">
                  <li>Brand : {product.brand}</li>
                  <li>Featured : {product.description}</li>
                  <div>{product.size}</div>
                  <div>{product.color}</div>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div class="card mb-3">
            <div class="card-header font-weight-bold text-uppercase">
              Featured Products
            </div>
            <div class="card-body">{showProductList}</div>
          </div>
        </div>
        <div className="col-md-4 border-end"></div>
        <div className="col-md-8"></div>
      </div>
    </div>
  );
}

export default ProductDetail;
