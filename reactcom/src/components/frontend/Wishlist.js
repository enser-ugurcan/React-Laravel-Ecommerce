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
  const [wishlist, setWishlist] = useState([]);

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
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th className="text-center">Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item, idx) => {
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
                  <td>
                    <Link
                      to={`/collections/${item.product.slug}/${item.product.name}`}
                    >
                      {item.product.name}
                    </Link>
                  </td>
                  <td width="15%" className="text-center">
                    ${item.product.selling_price}
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
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Wishlist</h6>
        </div>
      </div>
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{cart_HTML}</div>
            <div className="col-md-8"></div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
