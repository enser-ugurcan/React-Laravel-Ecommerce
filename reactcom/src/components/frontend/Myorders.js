import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
function Order() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMountered = true;
    axios.get(`/api/orders`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setOrders(res.data.orders);
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
  });

  var display_Orders = "";
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
          Loading Orders...
        </Button>
      </h4>
    );
  } else {
    display_Orders = orders.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.created_at}</td>
          <td>
            {item.firstname}
            <br />
            {item.lastname}
          </td>

          <td>{item.tracking_no}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>{item.address}</td>
          <td>
            <Link
              to={`view-order/${item.id}`}
              className="btn btn-success btn-sm"
            >
              View
            </Link>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>Orders</h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order Time</th>
                <th>Reciever</th>
                <th>Tracking No</th>
                <th>Phone No</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{display_Orders}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Order;
