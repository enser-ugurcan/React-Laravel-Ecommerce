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
import ReactStars from "react-stars";
import { useTheme, useThemeUpdate } from "../../../Contexts/CurrencyContext";
const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=6f398b79d13b5c3d9b17c0d6b9832ece";
function ProductDetail(props) {
  const history = useHistory();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [products, setProductt] = useState([]);
  const [productDescription, setproductDescription] = useState([]);
  const [productAttribute, setproductAttribute] = useState([]);
  const [trproduct, setTrproduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [comment, setComment] = useState([]);
  const [commentt, setCommentt] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const darkTheme = useTheme();
  const currencySymbols = [
    {
      name: "TRY",
      symbol: "₺",
    },
    {
      name: "USD",
      symbol: "$",
    },
    {
      name: "EUR",
      symbol: "€",
    },
  ];
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyOptions([data.rates]);
      });
  }, []);

  const fullCurrency = (symbol) => {
    let t = "";
    currencySymbols.forEach((v) => {
      if (v["name"] == symbol) {
        t = v["symbol"];
      }
    });
    return t;
  };

  const adjustCurrency = (currency) => {
    for (const [key, value] of Object.entries(currencyOptions[0])) {
      if (key == darkTheme) {
        const s = fullCurrency(key);
        return `${s} ` + currency * value;
      }
    }
  };

  const handleInput = (e) => {
    e.persist();
    setCart({ ...cart, [e.target.name]: e.target.value });
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  useEffect(() => {
    let isMountered = true;
    const category_slug = props.match.params.category;
    const product_name = props.match.params.product;
    axios
      .get(`/api/trviewproductdetails/${category_slug}/${product_name}`)
      .then((res) => {
        if (isMountered) {
          if (res.data.status === 200) {
            setProduct(res.data.product);
            setProductt(res.data.products);
            setproductDescription(res.data.productDescription);
            setproductAttribute(res.data.productAttribute);
            setTrproduct(res.data.trproduct);
            setComment(res.data.comment);
            setCommentt(res.data.ValueOfCommentRating);

            console.log(res.data.ValueOfCommentRating);
            console.log(res.data.comment);
            console.log(res.data.trproduct);
            console.log(res.data.product);
            console.log(res.data.products);
            console.log(res.data.productDescription);
            console.log(res.data.productAttribute);
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
  const [errorlist, setError] = useState([]);

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
            <span class="font-weight-bold h5">
              {adjustCurrency(item.selling_price)}
            </span>
            <del class="small text-muted mx-2">${item.original_price}</del>
          </div>
        </div>
      );
    });
  }
  var showComment = "";
  if (true) {
    showComment = comment.map((item, idx) => {
      return (
        <div class="row mb-3" key={idx}>
          <div class="card-body p-4">
            <div class="d-flex flex-start">
              <img
                class="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                alt="avatar"
                width="60"
                height="60"
              />
              <div>
                <h6 class="fw-bold mb-1">{item.name}</h6>
                <div class="d-flex align-items-center mb-3">
                  <p class="mb-0">
                    {item.created_at}
                    <span class="badge bg-primary"></span>
                  </p>
                  <p class="mb-0 px-5">
                    {item.rating}
                    <span class="badge bg-primary"></span>
                  </p>
                  <a href="#!" class="link-muted">
                    <i class="fas fa-heart ms-2"></i>
                  </a>
                </div>
                <p class="mb-0">{item.comment}</p>
              </div>
            </div>
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
                {productAttribute.brand}
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
              <h1 className="h5 d-inline mr-2">
                {productDescription.description}
              </h1>

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
                  {adjustCurrency(product.selling_price)}
                </span>
                <del className="small text-muted mr-2 px-1">
                  {adjustCurrency(product.original_price)}
                </del>
                <span className="rounded p-1 bg-warning mr-2 small">
                  -
                  {adjustCurrency(
                    product.original_price - product.selling_price
                  )}
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
                  <li>Brand : {productAttribute.brand}</li>
                  <li>Featured : {productDescription.description}</li>
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
        <hr />
        <div className="col-md-9 border-end">
          <div class="col-lg-12 col-md-8">
            <section>
              <div class="container my-5 py-5">
                <div class="row d-flex justify-content-center">
                  <div class="col-md-12 col-lg-10">
                    <div class="card text-dark">
                      <div>
                        {" "}
                        <h4 class="mb-0">Recent comments</h4>
                        <p class="fw-light mb-4 pb-2">
                          Latest Comments section by users
                        </p>
                      </div>
                      {showComment}
                      <hr class="my-0" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div></div>
        </div>
        <div className="col-md-4">
          {" "}
          <Link
            className="text-decoration-none"
            to={`/collections/${product.category.slug}/${product.name}/${product.id}/comment`}
          >
            {product.slug}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
