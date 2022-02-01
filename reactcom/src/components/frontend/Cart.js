import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import swal from "sweetalert";

function Cart() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  var totalPrice = 0;

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
      <div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                totalPrice += item.product.selling_price * item.product_qty;
                return (
                  <tr key={idx}>
                    <td width="10%">
                      <img
                        src={`http://localhost:8000/${item.product.image}`}
                        alt={item.product.name}
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>{item.product.name}</td>
                    <td width="15%" className="text-center">
                      ${item.product.selling_price}
                    </td>
                    <td width="15%">
                      <div className="input-group">
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
                    <td width="15%" className="text-center">
                      ${item.product.selling_price * item.product_qty}
                    </td>
                    <td width="10%">
                      <button
                        onClick={(e) => deleteCartItem(e, item.id)}
                        type="button"
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div className="card card-body mt-3">
              <h4>
                Sub Total:
                <span className="float-end">{totalPrice}</span>
              </h4>
              <h4>
                Grand Total:
                <span className="float-end">{totalPrice}</span>
              </h4>
              <hr />
              <Link to="/checkout" className="btn btn-primary">
                checkout
              </Link>
            </div>
          </div>
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
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Cart</h6>
        </div>
      </div>
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{cart_HTML}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
