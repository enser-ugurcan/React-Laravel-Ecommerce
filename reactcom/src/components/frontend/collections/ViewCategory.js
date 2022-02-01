import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    let isMountered = true;
    axios.get(`/api/getCategory`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setCategory(res.data.category);
          setLoading(false);
        }
      }
    });
    return () => {
      isMountered = false;
    };
  });
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
          Loading Category...
        </Button>
      </h4>
    );
  } else {
    var showCategoryList = "";
    showCategoryList = category.map((item) => {
      return (
        <div className="col-md-3" key={item.id}>
          <div className="card">
            <div className="card-body">
              <Link
                className="text-center text-decoration-none"
                to={`collections/${item.slug}`}
              >
                <h5>{item.slug}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="py-3 bg-warning">
      <div className="container">
        <div className="row">
          <h6>Category Page</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">{showCategoryList}</div>
        </div>
      </div>
    </div>
  );
}
export default ViewCategory;
