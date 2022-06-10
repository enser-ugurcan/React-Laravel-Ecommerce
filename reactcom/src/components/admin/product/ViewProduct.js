import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import swal from "sweetalert";

function ViewProduct() {
  const [loading, setLoading] = useState(true);
  const [viewProduct, setProduct] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "View Product";
    axios.get(`/api/view-product`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProduct(res.data.products);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const deleteProduct = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";
    axios.delete(`/api/delete-product/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Delete";
      }
    });
  };

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

          <td>{item.name}</td>
          <td>{item.selling_price}</td>
          <td>
            <img src={`http://localhost:8000/${item.image}`} width="50px" />
          </td>

          <td>
            <Link
              to={`edit-product/${item.id}`}
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
        <h4>
          View Product
          <Link
            to="/admin/add-product"
            className="btn btn-success btn-sm float-end"
          >
            Add Product
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Selling Price</th>
                <th>Image</th>
                <th>Edit</th>

                <th>Status</th>
              </tr>
            </thead>
            <tbody>{display_Productdata}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ViewProduct;
