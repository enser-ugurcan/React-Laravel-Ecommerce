import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import swal from "sweetalert";

function ViewLanguage() {
  const [loading, setLoading] = useState(true);
  const [languages, setLanguagelist] = useState([]);
  useEffect(() => {
    axios.get(`/api/view-language`).then((res) => {
      if (res.status === 200) {
        setLanguagelist(res.data.languages);
      }
      setLoading(false);
    });
  }, []);

  const deleteCategory = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";
    axios.delete(`/api/delete-language/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Delete";
      }
    });
  };

  var ViewCategory_HTMLTABLE = "";
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
          Loading Language...
        </Button>
      </h4>
    );
  } else {
    ViewCategory_HTMLTABLE = languages.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>
            {" "}
            <img
              src={`http://localhost:8000/${item.image}`}
              width="50px"
              alt={item.name}
            />
          </td>
          <td>
            <Link
              to={`edit-category/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <Link
              to="/#"
              type="button"
              onClick={(e) => deleteCategory(e, item.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </Link>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="container px-a">
      <div className="card mt 4">
        <div className="card-header">
          <h4>
            Langauge List
            <Link
              to="/admin/add-category"
              className="btn btn-primary btn-sm float-end"
            >
              Add Langauge
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Language İmage</th>
              </tr>
            </thead>
            <tbody>{ViewCategory_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewLanguage;
