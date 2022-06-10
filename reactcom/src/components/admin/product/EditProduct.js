import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { Spinner, Button } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import GlobalContext from "../../../Contexts/GlobalContext";

function EditProduct(props) {
  const history = useHistory();
  const [categorylist, setCategorylist] = useState([]);
  const [language, setLanguage] = useState([]);
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
    size: "",
    color: "",
    brand: "",
    description: "",
    meta_title: "",
  });
  const [picture, setPicture] = useState([]);
  const [errorlist, setError] = useState([]);
  const [allcheckbox, setCheckboxes] = useState([]);
  const [loading, setLoading] = useState(true);

  const globalContext = useContext(GlobalContext);

  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };
  const handleCheckbox = (e) => {
    e.persist();
    setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
  };
  const handleImage = (e) => {
    setPicture({
      image: e.target.files[0],
    });
  };
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
        setCategorylist(res.data.category);
      }
    });

    const product_id = props.match.params.id;
    axios.get(`/api/edit-product/${product_id}`).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data);
        setProduct(res.data.product);
        setCheckboxes(res.data.product);

        const deneme = res.data.product.product_descriptions.map((des) => {
          return des.description;
        });

        let arr = [];

        deneme.forEach((den, index) => {
          arr[`desc_${index}`] = den;
        });

        setDescriptions(arr);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/admin/view-product");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const UpdateProduct = (e) => {
    e.preventDefault();

    const product_id = props.match.params.id;

    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("qty", productInput.qty);
    formData.append("featured", allcheckbox.featured ? "1" : "0");
    formData.append("popular", allcheckbox.popular ? "1" : "0");
    formData.append("status", allcheckbox.status ? "1" : "0");
    formData.append("color", productInput.color);
    formData.append("size", productInput.size);
    formData.append("brand", productInput.brand);

    const data = new FormData(e.target);
    const obj = Object.fromEntries(data.entries());

    const obj2 = Object.fromEntries(formData.entries());

    const denem = { ...obj, ...descriptions };

    console.log("DENEM", denem);

    let arr = [];
    language.forEach((lang, index) => {
      const data = {
        language_id: lang.id,
        description: denem[`desc_${index}`],
        title: denem[`title${index}`],
      };
      arr = [data, ...arr];
      // console.log(data.get(`slug_${index}`));
      // console.log(data.get(`desc_${index}`));
      // console.log(data.get(`meta_title_${index}`));
    });

    console.log("ARR", arr);

    const sendData = { ...obj2, category_desc_arr: arr };

    console.log("DATA", sendData);

    axios.post(`/api/update-product/${product_id}`, sendData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        console.log(allcheckbox);
        setError([]);
      } else if (res.data.status === 422) {
        swal("all fields are mandatory", "", "error");
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/admin/view-product");
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
          Loading Category...
        </Button>
      </h4>
    );
  }

  return (
    <div className="container-flıid px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Edit Product
            <Link
              to="/admin/view-product"
              className="btn btn-primary btn-sm float-end"
            >
              View Product
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={UpdateProduct} encType="multipart/form-data">
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
                    {categorylist.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
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
                    <label>Orginal Price</label>
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
                      value={productInput.image}
                      className="form-control"
                    />
                    <img
                      src={`http://localhost:8000/${productInput.image}`}
                      width="50px"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Featured (checked-shown)</label>
                    <input
                      type="checkbox"
                      name="featured"
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.featured === 1 ? true : false}
                      className="w-50 h-50"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Popular (checked-shown)</label>
                    <input
                      type="checkbox"
                      name="popular"
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.popular === 1 ? true : false}
                      className="w-50 h-50"
                    />
                  </div>
                  <div className="col-md-3 form-group mb-3">
                    <label>Status (checked-shown)</label>
                    <input
                      type="checkbox"
                      name="status"
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.status === 1 ? true : false}
                      className="w-50 h-50"
                    />
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
                  <small className="text-danger">{errorlist.qty}</small>
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
                  <small className="text-danger">{errorlist.qty}</small>
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
                                data={
                                  productInput.product_descriptions.find(
                                    (desc) => {
                                      return desc.language.name === item.name;
                                    }
                                  ).description
                                }
                                onChange={(event, editor) => {
                                  //const data =
                                  const oldData = { ...descriptions };
                                  console.log("olddata1", oldData);

                                  oldData[`desc_${index}`] = editor.getData();
                                  console.log("BUNU GONDERİTORUZ", oldData);
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
                            <div className="form-group mb-3">
                              <label>Title</label>
                              <input
                                name={`title${index}`}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <br />
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
export default EditProduct;
