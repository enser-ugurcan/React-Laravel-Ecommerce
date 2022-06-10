import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AddProduct() {
  const history = useHistory();
  const [categorylist, setCategorylist] = useState([]);
  const [productlist, setProductlist] = useState([]);
  const [language, setLanguage] = useState([]);
  const [parent, setParent] = useState([]);
  const [parentNull, setParentNull] = useState([]);
  const [addData, setVal] = useState([""]);
  const [addedData, ShowData] = useState(0);
  const [descriptions, setDescriptions] = useState({});

  const [productInput, setProduct] = useState({
    category_id: "",
    slug: "",
    name: "",
    selling_price: "",
    original_price: "",
    qty: "",
    featured: "",
    popular: "",
    status: "",
    language_id: "",
    size: "",
    color: "",
    brand: "",
    description: "",
    meta_title: "",
    title: "",
  });
  const [picture, setPicture] = useState([]);
  const [errorlist, setError] = useState([]);
  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setPicture({
      image: e.target.files[0],
    });
  };
  useEffect(() => {
    axios.get("/api/view-product").then((res) => {
      if (res.data.status === 200) {
        setProductlist(res.data.products);
        console.log(res.data.product);
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
  useEffect(() => {
    axios.get("/api/all-category").then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.category);
        setCategorylist(res.data.category);
      }
    });
  }, []);
  const handleChange = (e, editor) => {
    const data = editor.getData();
    setVal(data);
  };
  const submitProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("qty", productInput.qty);
    formData.append("featured", productInput.featured);
    formData.append("popular", productInput.popular);
    formData.append("status", productInput.status);
    formData.append("color", productInput.color);
    formData.append("size", productInput.size);
    formData.append("brand", productInput.brand);
    // const data = new FormData(e.target);
    // //console.log(data.values());
    // const obj = Object.fromEntries(data.entries());
    // const denem = { ...obj, ...descriptions };

    // console.log(denem);
    // language.forEach((lang, index) => {
    //   const data = {
    //     language_id: lang.id,
    //     parent_id: denem[`parent_id`],
    //     descrip: denem[`desc_${index}`],
    //     meta_title: denem[`meta_title_${index}`],
    //   };
    //   console.log(data);
    // console.log(data.get(`slug_${index}`));
    // console.log(data.get(`desc_${index}`));
    // console.log(data.get(`meta_title_${index}`));
    //   axios.post("/api/store-product", data).then((res) => {
    //     if (res.data.status === 200) {
    //       swal("Succes", res.data.message, "success");
    //       document.getElementById("CATEGORY_FORM").reset();
    //     } else if (res.data.status === 400) {
    //       setProduct({ ...productInput, error_list: res.data.errors });
    //     }
    //   });
    // });
    // formData.append("description", productInput.description);
    // // formData.append("detaildesc", productInput.detaildesc);
    // formData.append("language_id", productInput.language_id);
    // formData.append("meta_title", productInput.meta_title);
    // formData.append("product_id", productInput.product_id);
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data.entries());

    const obj2 = Object.fromEntries(formData.entries());

    const denem = { ...obj, ...descriptions };

    let arr = [];
    language.forEach((lang, index) => {
      const data = {
        language_id: lang.id,
        description: denem[`description_${index}`],
        title: denem[`title${index}`],
      };
      arr = [data, ...arr];
      // console.log(data.get(`slug_${index}`));
      // console.log(data.get(`desc_${index}`));
      // console.log(data.get(`meta_title_${index}`));
    });

    const sendData = { ...obj2, category_desc_arr: arr };

    console.log("DATA", sendData);

    axios.post("/api/store-product", sendData).then((res) => {
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
            Add Product
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
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="otherdetails-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#otherdetails"
                  type="button"
                  role="tab"
                  aria-controls="otherdetails"
                  aria-selected="false"
                >
                  Other Details
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="attribute-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#attribute"
                  type="button"
                  role="tab"
                  aria-controls="attribute"
                  aria-selected="false"
                >
                  Attribute
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="description-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#description"
                  type="button"
                  role="tab"
                  aria-controls="description"
                  aria-selected="false"
                >
                  Description
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
                  <label>Select Category</label>
                  <select
                    name="category_id"
                    onChange={handleInput}
                    value={productInput.category_id}
                    className="form-control"
                  >
                    <option>---------Select Category----------</option>
                    {categorylist.map((item) => {
                      return (
                        <option value={item.category_id} key={item.id}>
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                  <small className="text-danger">{errorlist.category_id}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={productInput.name}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.name}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    onChange={handleInput}
                    value={productInput.slug}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.slug}</small>
                </div>
              </div>
              <div
                className="tab-pane card-body boder fade"
                id="otherdetails"
                role="tabpanel"
                aria-labelledby="otherdetails-tab"
              >
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label>Selling Price</label>
                    <input
                      type="text"
                      name="selling_price"
                      onChange={handleInput}
                      value={productInput.selling_price}
                      className="form-control"
                    />
                    <small className="text-danger">
                      {errorlist.selling_price}
                    </small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Original Price</label>
                    <input
                      type="text"
                      name="original_price"
                      onChange={handleInput}
                      value={productInput.original_price}
                      className="form-control"
                    />
                    <small className="text-danger">
                      {errorlist.original_price}
                    </small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Quantity Price</label>
                    <input
                      type="text"
                      name="qty"
                      onChange={handleInput}
                      value={productInput.qty}
                      className="form-control"
                    />
                    <small className="text-danger">{errorlist.qty}</small>
                  </div>

                  <div className="col-md-8 form-group mb-3">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImage}
                      className="form-control"
                    />
                    <small className="text-danger">{errorlist.image}</small>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane card-body boder fade"
                id="attribute"
                role="tabpanel"
                aria-labelledby="attribute-tab"
              >
                <div className="col-md-4 form-group mb-3">
                  <label>Color</label>
                  <input
                    type="text"
                    name="color"
                    onChange={handleInput}
                    value={productInput.color}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.color}</small>
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Size</label>
                  <input
                    type="text"
                    name="size"
                    onChange={handleInput}
                    value={productInput.size}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.size}</small>
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    onChange={handleInput}
                    value={productInput.brand}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.brand}</small>
                </div>
              </div>
              <div
                className="tab-pane card-body boder fade"
                id="description"
                role="tabpanel"
                aria-labelledby="description-tab"
              >
                {" "}
                <div className="card-body">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    {language.map((item, index) => (
                      <li className="nav-item" role="presentation">
                        <button
                          className={`${
                            index === 0 ? "nav-link active" : "nav-link"
                          }`}
                          id={`nav-${item.id}-tab`}
                          data-bs-toggle="tab"
                          data-bs-target={`#nav-${item.id}`}
                          type="button"
                          role="tab"
                          aria-controls={`nav-${item.id}`}
                          aria-selected="true"
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="tab-content" id="pills-tabContent">
                    {language.map((item, index) => {
                      return (
                        <div
                          className={`${
                            index === 0
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }`}
                          id={`nav-${item.id}`}
                          role="tabpanel"
                          aria-labelledby={`nav-${item.id}`}
                        >
                          <div
                            className="tab-pane card-body border fade show active"
                            id={item.name}
                            role="tabpanel"
                            aria-labelledby={`${item.name}-tab`}
                          >
                            <div className="form-group mb-3">
                              <label>Description</label>
                              <CKEditor
                                id={`desc_${index}`}
                                editor={ClassicEditor}
                                data=""
                                onChange={(event, editor) => {
                                  //const data =
                                  const oldData = { ...descriptions };
                                  console.log("olddata1", oldData);

                                  oldData[`description_${index}`] =
                                    editor.getData();
                                  console.log("olddata2", oldData);
                                  setDescriptions(oldData);
                                  //console.log(data);
                                  //setCategory({ ...categoryInput, descrip: data });
                                }}
                                onBlur={(event, editor) => {
                                  //console.log("Blur.", editor);
                                }}
                                onFocus={(event, editor) => {
                                  //console.log("Focus.", editor);
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-group mb-3">
                            <label>Title</label>
                            <input
                              name={`title${index}`}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <br />
                </div>
                {/* <div className="col-md-4 form-group mb-3">
                  <label>Select Product </label>
                  <select
                    type="text"
                    name="product_id"
                    onChange={handleInput}
                    value={productInput.product_id}
                    className="form-control"
                  >
                    {" "}
                    <option>-----Select Product--------</option>
                    {productlist.map((item) => {
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
                </div> */}
                {/* <div>
                  <div>
                    <CKEditor
                      className="form-control"
                      name="detaildesc"
                      editor={ClassicEditor}
                      onChange={handleInput}
                      value={productInput.detaildesc}
                    />
                  </div>
                  <small className="text-danger">{errorlist.detaildesc}</small>
                </div> */}
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
export default AddProduct;
