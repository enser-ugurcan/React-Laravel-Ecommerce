import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import swal from "sweetalert";
import { FaTimes, FaRegHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTheme, useThemeUpdate } from "../../Contexts/CurrencyContext";
const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=6f398b79d13b5c3d9b17c0d6b9832ece";

function Cart() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const darkTheme = useTheme();
  const currencySymbols = [
    {
      name: "EUR",
      symbol: "€",
    },
    {
      name: "TRY",
      symbol: "₺",
    },
    {
      name: "USD",
      symbol: "$",
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
  if (!localStorage.getItem("auth_token")) {
    history.push("/");
    swal("Warning", "Login to go to Wishlist Page", "error");
  }

  useEffect(() => {
    let isMountered = true;

    axios.get(`/api/wishlist`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setWishlist(res.data.wishlist);
          setLoading(false);
        } else if (res.data.status === 401) {
          history.push("/");
          swal("Warning", res.data.message, "error");
        }
      }
    });

    return () => {
      isMountered = false;
    };
  }, [history]);
  const deleteCartItem = (e, wishlist_id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";
    axios.delete(`/api/delete-wishlistitem/${wishlist_id}`).then((res) => {
      if (res.data.status === 200) {
        // swal("Succes", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        //  swal("Error", res.data.message, "error");
        thisClicked.innerText = "Remove";
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
          Loading Wishlist Detail...
        </Button>
      </h4>
    );
  }

  var cart_HTML = "";
  if (wishlist.length > 0) {
    cart_HTML = (
      <div className="row">
        <div className="col-md-9">
          <div className="card">
            <div className="table-responsive">
              <table className="table table-borderless">
                <thead className="text-muted">
                  <tr className="small text-uppercase">
                    <th scope="col">Product</th>
                    <th scope="col" width="120">
                      Quantity
                    </th>
                    <th scope="col" width="130" className="text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <div className="row">
                            <div className="col-3 d-none d-md-block">
                              <img
                                src={`http://localhost:8000/${item.product.image}`}
                                alt={item.product.name}
                                width="50px"
                                height="50px"
                              />
                            </div>
                            <div className="col">
                              <Link
                                className="text-decoration-none text-dark"
                                to="/"
                              >
                                {item.product.name}
                              </Link>
                              <p className="small text-muted">
                                Sİze:{item.product.size} Color:
                                {item.product.color} Brand: {item.product.brand}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <var className="price">
                            {adjustCurrency(
                              item.product.selling_price * item.product_qty
                            )}
                          </var>
                        </td>
                        <td className="text-right">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={(e) => deleteCartItem(e, item.id)}
                            type="button"
                          >
                            <FaTimes />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              <Link className="btn btn-secondary" to="/">
                <FaArrowLeft />
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
        <div className="alert alert-success mt-3">
          <p className="m-0">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="mx-2"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
              ></path>
            </svg>
            Free Delivery within 1-2 weeks
          </p>
        </div>
      </div>
    );
  } else {
    cart_HTML = (
      <div className="table-responsive">
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Your Wishlist is Empty</h4>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Wishlist </h1>
      </div>
      <div className="container mb-3">
        <div className="row g-3">{cart_HTML}</div>
      </div>
    </div>
  );
}
export default Cart;
