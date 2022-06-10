import axios from "axios";
import React, { useContext } from "react";
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
import GlobalContext from "../../../Contexts/GlobalContext";
import parse from "html-react-parser";
import ReactHtmlParser from "react-html-parser";
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
  const [commentt, setCommentt] = useState("");
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [brand, setBrand] = useState([]);
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
        return `${s} ` + Math.floor(currency * value);
      }
    }
  };
  const globalContext = useContext(GlobalContext);
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
      .get(`/api/viewproductdetails/${category_slug}/${product_name}`)
      .then((res) => {
        if (isMountered) {
          if (res.data.status === 200) {
            setProduct(res.data.product);
            console.log(res.data.product);
            setProductt(res.data.products);
            setproductDescription(res.data.productDescription);
            setproductAttribute(res.data.productAttribute);
            setTrproduct(res.data.trproduct);
            setComment(res.data.comment);
            setCommentt(res.data.ValueOfCommentRating);
            setBrand(res.data.brand);
            console.log(res.data.brand);
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
  console.log("sa", products);
  var showProductList = "";

  if (true) {
    showProductList = products.map((item, idx) => {
      return (
        <div class="row mb-3" key={idx}>
          <div class="col-md-4">
            <Link to={`/collections/${item.category.id}/${item.id}`}>
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
        <div class="border-bottom mb-3" key={idx}>
          <div class="mb-2">
            <span class="text-muted">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="text-success mr-1"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                ></path>
              </svg>
              {item.name} | Reviewed on
              <i class="font-weight-bold"> {item.created_at}</i>
              <span className="px-2"> Rating : {item.rating}</span>
            </span>
          </div>
          <p className="px-3">{item.comment}</p>

          <div class="mb-2"></div>

          {/* <div class="card-body p-4">
            <div class="d-flex flex-start">
              <img
                class="rounded-circle shadow-1-strong me-3"
                src=""
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
          </div> */}
        </div>
      );
    });
  }
  var productDetails = "";
  // if (true) {
  //   productDetails = product.map((item) => {
  //     return (
  //       <div className="col-md-12">
  //         <p>
  //           {
  //             item.product_descriptions.find((x) => {
  //               return x.language.name === globalContext.language;
  //             }).title
  //           }
  //         </p>
  //       </div>
  //     );
  //   });
  // }
  const ReactHtml = product.product_descriptions.find((proc) => {
    return proc.language.name === globalContext.language;
  }).description;

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
        <div className="col-md-9 mx-5">
          <div className="row mb-4">
            <div className="col-md-5 text-center">
              <span className="float-start badge btn-sm btn-danger badge-pil"></span>
              <ImageZoom
                src="https://cartzilla.createx.studio/img/home/mono-product/hero-bg.jpg"
                alt="A image to apply the ImageZoom plugin"
                zoom="200"
              />
            </div>
            <div className="col-md-7">
              <h1 className="h5 d-inline mr-2"></h1>
              <div className="mb-3">
                <h4>{product.name}</h4>
              </div>
              <div className="col-md-4 mb-4">
                {" "}
                <Link
                  className="text-decoration-none text-dark"
                  to={`/collections/${product.category.id}/${product.name}/${product.id}/comment`}
                >
                  Comments
                </Link>
              </div>
              <dl className="row small mb-3">
                <dt className="col-sm-3">Ürün Puanlaması</dt>
                <dt className="col-sm-9"> {commentt}</dt>
                <br />
                <br />
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
                <ul className="small"></ul>
              </div>
            </div>
          </div>
          <div className="col-md-12 text-center">
            <div>
              <hr />
              <div className="mt-5">{ReactHtmlParser(ReactHtml)}</div>
            </div>
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
      </div>
    </div>
  );
}

export default ProductDetail;
