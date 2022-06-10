import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect } from "react";

function Category() {
  const [language, setLanguage] = useState([]);
  const [errorlist, setError] = useState([]);
  const [categoryInput, setCategory] = useState({
    parent_id: "",
    name: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios.get("/api/all-topcategory").then((res) => {
      if (res.data.status === 200) {
        setLanguage(res.data.category);
        console.log(res.data.languages);
      }
    });
  }, []);
  const submitCategory = (e) => {
    e.preventDefault();
    const data = {
      parent_id: categoryInput.parent_id,
      name: categoryInput.name,
    };
    axios.post("/api/store-topcategory", data).then((res) => {
      if (res.data.status === 200) {
        swal("Succes", res.data.message, "success");
        document.getElementById("CATEGORY_FORM").reset();
      } else if (res.data.status === 400) {
        setCategory({ ...categoryInput, error_list: res.data.errors });
      }
    });
  };
  var display_errors = [];
  if (categoryInput.error_list) {
    display_errors = [
      categoryInput.error_list.parent_id,
      categoryInput.error_list.name,
    ];
  }

  return (
    <div className="container-fluid px-4">
      {display_errors.map((item) => {
        return (
          <p className="mb-1" key={item}>
            {item}
          </p>
        );
      })}
      <div className="card mt4">
        <div className="card-header">
          <h4 className="mt-4">
            Add Category
            <Link
              to="/admin/view-topcategory"
              className="btn btn-primary btn-sm float-end"
            >
              View Category
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={submitCategory} id="CATEGORY_FORM">
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
                className="tab-pane card-body border fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="col-md-4 form-group mb-3">
                  <label>Select Category </label>
                  <select
                    type="text"
                    name="parent_id"
                    onChange={handleInput}
                    value={categoryInput.parent_id}
                    className="form-control"
                  >
                    {" "}
                    <option>-----Select Category--------</option>
                    {language.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <small className="text-danger">{errorlist.language_id}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    name="name"
                    type="text"
                    onChange={handleInput}
                    value={categoryInput.name}
                    className="form-control"
                  />
                  <span>{categoryInput.error_list.name}</span>
                </div>
              </div>
            </div>
            <br />
            <button type="submit" className="btn btn-primary px-4">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Category;
