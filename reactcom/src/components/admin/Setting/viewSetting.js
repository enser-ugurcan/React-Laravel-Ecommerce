import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";

function ViewSetting() {
  const [loading, setLoading] = useState(true);
  const [viewProduct, setProduct] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "View Setting";
    axios.get(`/api/view-setting`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProduct(res.data.setting);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  var display_Productdata = "";
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
          Loading Products...
        </Button>
      </h4>
    );
  } else {
    var ProdStatus = "";
    display_Productdata = viewProduct.map((item) => {
      if (item.status === "0") {
        ProdStatus = "shown";
      } else if (item.status === "1") {
        ProdStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>
            <Link
              to={`edit-setting/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>{ProdStatus}</td>
        </tr>
      );
    });
  }

  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>View Setting</h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{display_Productdata}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ViewSetting;
