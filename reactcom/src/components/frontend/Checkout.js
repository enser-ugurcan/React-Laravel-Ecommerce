import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import swal from "sweetalert";
import { BsTruck, BsCartPlus } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import {
  useTheme,
  useThemeUpdate,
} from "../../../src/Contexts/CurrencyContext";
const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=6f398b79d13b5c3d9b17c0d6b9832ece";

function Checkout() {
  const history = useHistory();

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
        return `${s} ` + Math.floor(currency * value);
      }
    }
  };

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const [checkoutInput, setCheckoutInput] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    cvv: "",
    cardname: "",
    cardnumber: "",
    expirationmonth: "",
    expirationyear: "",
  });
  const [error, setError] = useState([]);
  const cartCount = cart.length;
  useEffect(() => {
    let isMountered = true;

    axios.get(`/api/cart`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
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

  const handleInput = (e) => {
    e.persist();
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };
  const submitOrder = (e) => {
    e.preventDefault();
    const data = {
      firstname: checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipcode: checkoutInput.zipcode,
      cardname: checkoutInput.cardname,
      cardnumber: checkoutInput.cardnumber,
      expirationmonth: checkoutInput.expirationmonth,
      expirationyear: checkoutInput.expirationyear,
      cvv: checkoutInput.cvv,
    };
    axios.post(`/api/place-order`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Order Placed Successfully", "", "success");
        setError([]);
        history.push("/thank-you");
      } else if (res.data.status === 422) {
        swal("All fields are mandatory", "", "error");
        setError(res.data.errors);
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
          Loading Checkout...
        </Button>
      </h4>
    );
  }

  var totalPrice = 0;
  var discount = 0;
  var result = 0;

  var checkout_HTML = "";
  if (cart.length > 0) {
    checkout_HTML = (
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-header">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="mx-2"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"
                ></path>
              </svg>
              Contact Info
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    onChange={handleInput}
                    value={checkoutInput.email}
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email Address"
                  />
                  <small className="text-danger">{error.email}</small>
                </div>
                <div className="col-md-6">
                  <input
                    onChange={handleInput}
                    value={checkoutInput.phone}
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Mobile No"
                  />
                  <small className="text-danger">{error.phone}</small>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-header">
              <BsTruck className="mx-2" />
              Shipping Infomation
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    onChange={handleInput}
                    value={checkoutInput.firstname}
                    type="text"
                    name="firstname"
                    className="form-control"
                    placeholder="Name"
                  />
                  <small className="text-danger">{error.firstname}</small>
                </div>
                <div className="col-md-6">
                  <input
                    onChange={handleInput}
                    value={checkoutInput.lastname}
                    type="text"
                    name="lastname"
                    className="form-control"
                    placeholder="Last Name"
                  />
                  <small className="text-danger">{error.lastname}</small>
                </div>
                <div className="col-md-12">
                  <textarea
                    onChange={handleInput}
                    value={checkoutInput.address}
                    rows="3"
                    name="address"
                    className="form-control"
                    placeholder="Address"
                  />
                  <small className="text-danger">{error.address}</small>
                </div>
                <div className="col-md-4">
                  <input
                    onChange={handleInput}
                    value={checkoutInput.city}
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                  />
                  <small className="text-danger">{error.city}</small>
                </div>
                <div className="col-md-4">
                  <input
                    onChange={handleInput}
                    value={checkoutInput.state}
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="State"
                  />
                  <small className="text-danger">{error.state}</small>
                </div>
                <div className="col-md-4">
                  <input
                    onChange={handleInput}
                    value={checkoutInput.zipcode}
                    type="text"
                    name="zipcode"
                    className="form-control"
                    placeholder="Zip Code"
                  />
                  <small className="text-danger">{error.zipcode}</small>
                </div>
              </div>
            </div>
            <div className="card mb-3 border-info">
              <div className="card-header bg-info">
                <svg
                  width="2em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="i-va"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
                  ></path>
                  <path d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M2 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
                  ></path>
                </svg>
                Payment Method
              </div>
              <div className="card-body">
                <div className="row g-3 mb-3 border-bottom">
                  <div className="col-md-6">
                    <div className="form-check px-3">
                      <label className="form-check-label" for="credit">
                        Credit card
                        <img
                          src="https://e-commerce-template.surge.sh/images/payment/cards.webp"
                          className="ml-3"
                          height="26"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <input
                      onChange={handleInput}
                      value={checkoutInput.cardname}
                      type="text"
                      name="cardname"
                      className="form-control"
                      placeholder="Name on Card"
                    />
                    <small className="text-danger">{error.cardname}</small>
                  </div>
                  <div class="col-md-6">
                    <input
                      onChange={handleInput}
                      value={checkoutInput.cardnumber}
                      type="number"
                      name="cardnumber"
                      className="form-control"
                      placeholder="Card Number"
                    />
                    <small className="text-danger">{error.cardnumber}</small>
                  </div>
                  <div class="col-md-4">
                    <input
                      onChange={handleInput}
                      value={checkoutInput.expirationmonth}
                      type="number"
                      name="expirationmonth"
                      className="form-control"
                      placeholder="Expiration month"
                    />
                    <small className="text-danger">
                      {error.expirationmonth}
                    </small>
                  </div>
                  <div class="col-md-4">
                    <input
                      onChange={handleInput}
                      value={checkoutInput.expirationyear}
                      type="number"
                      name="expirationyear"
                      className="form-control"
                      placeholder="Expiration year"
                    />
                    <small className="text-danger">
                      {error.expirationyear}{" "}
                    </small>
                  </div>
                  <div class="col-md-4">
                    <input
                      onChange={handleInput}
                      value={checkoutInput.cvv}
                      type="number"
                      name="cvv"
                      className="form-control"
                      placeholder="CVV"
                    />
                    <small className="text-danger">{error.cvv}</small>
                  </div>
                </div>
              </div>

              <div className="card-footer border-info d-flex flex-row-reverse bd-highlight">
                <button
                  type="button"
                  //  className="btn btn-block btn-info"
                  className="btn btn-primary"
                  onClick={submitOrder}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <BsCartPlus className="mx-2" />
              Cart
              <span class="badge bg-secondary float-end">{cartCount}</span>
            </div>
            <div className="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between lh-sm">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th width="40%">Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, idx) => {
                      totalPrice +=
                        item.product.selling_price * item.product_qty;

                      console.log(totalPrice);
                      result = totalPrice;
                      return (
                        <tr key={idx}>
                          <td>{item.product.name}</td>
                          <td>{adjustCurrency(item.product.selling_price)}</td>
                          <td>{item.product_qty}</td>
                          <td>
                            {adjustCurrency(
                              item.product.selling_price * item.product_qty
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </li>

              <div className="card">
                <div className="card-body">
                  <dl className="row border-bottom">
                    <dt className="col-6">Total price:</dt>
                    <dd className="col-6 text-right">
                      {adjustCurrency(totalPrice)}
                    </dd>
                  </dl>

                  <dl className="row">
                    <br />
                    <hr />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={submitOrder}
                    >
                      Place Order
                    </button>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    checkout_HTML = (
      <div className="table-responsive">
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Your Shopping Cart is Empty. You are in Checkout Page </h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div class="bg-secondary border-top p-4 text-white mb-3">
        <h1 class="display-6">Checkout</h1>
      </div>
      <div className="container mb-3">{checkout_HTML}</div>
      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
