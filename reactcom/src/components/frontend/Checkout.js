import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import swal from "sweetalert";

function Checkout() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  var totalPrice = 0;
  const [checkoutInput, setCheckoutInput] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [error, setError] = useState([]);

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
  var checkout_HTML = "";
  if (cart.length > 0) {
    checkout_HTML = (
      <div>
        <div className="row">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header">
                <h4>Basic Information</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>First Name</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.firstname}
                        type="text"
                        name="firstname"
                        className="form-control"
                      />
                      <small className="text-danger">{error.firstname}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Last Name</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.lastname}
                        type="text"
                        name="lastname"
                        className="form-control"
                      />
                      <small className="text-danger">{error.lastname}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Phone Number</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.phone}
                        type="text"
                        name="phone"
                        className="form-control"
                      />
                      <small className="text-danger">{error.phone}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>E-mail Address</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.email}
                        type="text"
                        name="email"
                        className="form-control"
                      />
                      <small className="text-danger">{error.email}</small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label>Full Address</label>
                      <textarea
                        onChange={handleInput}
                        value={checkoutInput.address}
                        rows="3"
                        name="address"
                        className="form-control"
                      />
                      <small className="text-danger">{error.address}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>City</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.city}
                        type="text"
                        name="city"
                        className="form-control"
                      />
                      <small className="text-danger">{error.city}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>State</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.state}
                        type="text"
                        name="state"
                        className="form-control"
                      />
                      <small className="text-danger">{error.state}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Zip Code</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.zipcode}
                        type="text"
                        name="zipcode"
                        className="form-control"
                      />
                      <small className="text-danger">{error.zipcode}</small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group text-end">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={submitOrder}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="50%">Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => {
                  totalPrice += item.product.selling_price * item.product_qty;
                  return (
                    <tr key={idx}>
                      <td>{item.product.name}</td>
                      <td>{item.product.selling_price}</td>
                      <td>{item.product_qty}</td>
                      <td>{item.product.selling_price * item.product_qty}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="2" className="text-end fw-bold">
                    Grand Total
                  </td>
                  <td colSpan="2" className="text-end fw-bold">
                    {totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
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
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Cart</h6>
        </div>
      </div>
      <div className="py-4">
        <div className="container">{checkout_HTML}</div>
      </div>
    </div>
  );
}

export default Checkout;
