import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import $ from "jquery";

function AddProductDescripiton() {
  const history = useHistory();
  const [categorylist, setCategorylist] = useState([]);
  const [language, setLanguage] = useState([]);
  const [productInput, setProduct] = useState({
    description: "",
    language_id: "",
    meta_title: "",
    product_id: "",
    detaildesc: "",
  });
  const [errorlist, setError] = useState([]);
  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios.get("/api/view-product").then((res) => {
      if (res.data.status === 200) {
        setCategorylist(res.data.products);
      }
    });
  }, []);
  useEffect(() => {
    axios.get("/api/language").then((res) => {
      if (res.data.status === 200) {
        setLanguage(res.data.languages);
        console.log(res.data.languages);
      }
    });
  }, []);
  $("#summernote").summernote({
    placeholder: "Hello stand alone ui",
    tabsize: 2,
    height: 120,
    toolbar: [
      ["style", ["style"]],
      ["font", ["bold", "underline", "clear"]],
      ["color", ["color"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["table", ["table"]],
      ["insert", ["link", "picture", "video"]],
      ["view", ["fullscreen", "codeview", "help"]],
    ],
  });
  const submitProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("language_id", productInput.language_id);
    formData.append("description", productInput.description);
    formData.append("product_id", productInput.product_id);
    formData.append("meta_title", productInput.meta_title);
    formData.append("detaildesc", productInput.detaildesc);

    axios.post("/api/store-product-description", formData).then((res) => {
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
            Add Product Description
            <Link
              to="/admin/view-product"
              className="btn btn-primary btn-sm float-end"
            >
              View Product
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={submitProduct} encType="multipart/form-data">
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
                <div className="col-md-4 form-group mb-3">
                  <label>Select Product </label>
                  <select
                    type="text"
                    name="product_id"
                    onChange={handleInput}
                    value={productInput.product_id}
                    className="form-control"
                  >
                    {" "}
                    <option>-----Select Language--------</option>
                    {categorylist.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <small className="text-danger">{errorlist.product_id}</small>
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Select Language </label>
                  <select
                    type="text"
                    name="language_id"
                    onChange={handleInput}
                    value={productInput.language_id}
                    className="form-control"
                  >
                    {" "}
                    <option>-----Select Language--------</option>
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
                <div className="col-md-12 form-group mb-3">
                  <label>Description</label>
                  <textarea
                    type="text"
                    name="description"
                    onChange={handleInput}
                    value={productInput.description}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.description}</small>
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Meta title</label>
                  <input
                    type="text"
                    name="meta_title"
                    onChange={handleInput}
                    value={productInput.meta_title}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.meta_title}</small>
                </div>
                <div className="col-md-12 form-group mb-3">
                  <label>Description</label>
                  <textarea
                    id="summernote"
                    type="text"
                    name="detaildesc"
                    onChange={handleInput}
                    value={productInput.detaildesc}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.description}</small>
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
export default AddProductDescripiton;
