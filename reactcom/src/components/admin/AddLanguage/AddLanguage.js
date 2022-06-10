import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function AddLanguage() {
  const [picture, setPicture] = useState([]);
  const [languageInput, setLanguage] = useState({
    name: "",
  });
  const handleImage = (e) => {
    setPicture({
      image: e.target.files[0],
    });
  };

  const [errorlist, setError] = useState([]);
  const handleInput = (e) => {
    e.persist();
    setLanguage({ ...languageInput, [e.target.name]: e.target.value });
  };
  const submitLanguage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", languageInput.name);
    formData.append("image", picture.image);
    axios.post("/api/add-language", formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setError([]);
      } else if (res.data.status === 422) {
        swal("all fields are mandatory", "", "error");
        setError(res.data.errors);
      }
    });
  };
  return (
    <div className="container-flıid px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Add Language
            <Link
              to="/admin/view-product"
              className="btn btn-primary btn-sm float-end"
            >
              View Product
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={submitLanguage} encType="multipart/form-data">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Home
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane card-body boder fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="form-group mb-3">
                  <label>Language Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={languageInput.name}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.name}</small>
                </div>
                <div className="col-md-8 form-group mb-3">
                  <label>Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImage}
                    value={languageInput.image}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.image}</small>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary px-4 mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddLanguage;
