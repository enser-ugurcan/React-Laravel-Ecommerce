import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import swal from "sweetalert";
import { FaTimes, FaRegHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Cart() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const handleInput = (e) => {
    e.persist();
    setCart({ ...cart, [e.target.name]: e.target.value });
  };
  var totalPrice = 0;
  var discount = 0;
  var Result = 0;
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
  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "dec");
  };
  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "inc");
  };
  function updateCartQuantity(cart_id, scope) {
    axios.put(`/api/cart-updatequntity/${cart_id}/${scope}`).then((res) => {
      if (res.data.status === 200) {
        //swal("Succes", res.data.message, "success");
      }
    });
  }
  const deleteCartItem = (e, cart_id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";
    axios.delete(`/api/delete-cartitem/${cart_id}`).then((res) => {
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
          Loading Cart Detail...
        </Button>
      </h4>
    );
  }

  var cart_HTML = "";
  if (cart.length > 0) {
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
                    <th scope="col" width="150">
                      Price
                    </th>
                    <th scope="col" width="130" className="text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, idx) => {
                    totalPrice += item.product.selling_price * item.product_qty;
                    discount = (totalPrice * 10) / 100;
                    Result = totalPrice - discount;
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
                          <div className="input-group input-group-sm mw-140">
                            <button
                              onClick={() => handleDecrement(item.id)}
                              type="button"
                              className="input-group-text"
                            >
                              -
                            </button>
                            <div className="form-control text-center">
                              {item.product_qty}
                            </div>
                            <button
                              onClick={() => handleIncrement(item.id)}
                              typeo="button"
                              className="input-group-text"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <var className="price">
                            ${item.product.selling_price * item.product_qty}
                          </var>
                          <small className="d-block text-muted">
                            ${item.product.selling_price} each
                          </small>
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
              <Link className="btn btn-primary float-end " to="/checkout">
                Make Purchase
                <FaArrowRight />
              </Link>

              <Link className="btn btn-secondary" to="/">
                <FaArrowLeft />
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <dl className="row border-bottom">
                <dt className="col-6">Total price:</dt>
                <dd className="col-6 text-right">${totalPrice}</dd>
                <dt className="col-6 text-success">Discount:</dt>
                <dd className="col-6 text-success text-right">-${discount}</dd>
              </dl>
              <dl className="row">
                <dt className="col-6">Total:</dt>
                <dd className="col-6 text-right h5">
                  <strong>${Result}</strong>
                </dd>
                <Link to="/checkout" className="btn btn-primary">
                  Confirm Cart
                </Link>
              </dl>
              <hr />
              <p className="text-center">
                <img
                  src="https://e-commerce-template.surge.sh/images/payment/payments.webp"
                  alt="..."
                  height="26"
                />
              </p>
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
          <h4>Your Shopping Cart is Empty</h4>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>

      <div className="container mb-3">{cart_HTML}</div>
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
export default Cart;
