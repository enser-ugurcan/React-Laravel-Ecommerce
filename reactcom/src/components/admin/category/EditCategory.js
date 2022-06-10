import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Spinner, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function EditCategory(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [categoryInput, setCategory] = useState([]);
  const [category, setCategorylist] = useState([]);
  const [language, setLanguage] = useState([]);
  const [descriptions, setDescriptions] = useState({});
  const [errorlist, setError] = useState([]);
  const [parent, setParent] = useState([]);
  const [parentNull, setParentNull] = useState([]);
  const [topcategory, setTopcategory] = useState([]);
  const [parentAll, setParentAll] = useState([]);

  useEffect(() => {
    const category_id = props.match.params.id;
    axios.get(`/api/edit-category/${category_id}`).then((res) => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/admin/view-category");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);
  useEffect(() => {
    axios.get("/api/language").then((res) => {
      if (res.data.status === 200) {
        setLanguage(res.data.languages);
        console.log(res.data.languages);
      }
    });
  }, []);
  useEffect(() => {
    axios.get("/api/parent").then((res) => {
      if (res.data.status === 200) {
        setParent(res.data.parentNotNull);
        setParentNull(res.data.parentNull);
        setParentAll(res.data.parentAll);
        console.log(res.data.parentNotNull);
        console.log(res.data.parentNull);
        console.log(res.data.parentAll);

        //console.log(res.data.languages);
      }
    });
  }, []);
  useEffect(() => {
    axios.get("/api/all-category").then((res) => {
      if (res.data.status === 200) {
        setCategorylist(res.data.category);
      }
    });
  }, []);
  useEffect(() => {
    axios.get("/api/all-topcategory").then((res) => {
      if (res.data.status === 200) {
        setTopcategory(res.data.category);
      }
    });
  }, []);

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };
  const updateCategory = (e) => {
    e.preventDefault();
    //console.log(data.values());
    const obj = Object.fromEntries(data.entries());
    const denem = { ...obj, ...descriptions };
    const category_id = props.match.params.id;
    const data = categoryInput;
    axios.put(`/api/update-category/${category_id}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setError([]);
      } else if (res.data.status === 422) {
        swal("All fields are mandatory", "", "error");
        setCategory({ ...categoryInput, error_list: res.data.errors });
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        History.push("admin/vies-category");
      }
    });
  };
  var display_errors = [];
  if (categoryInput.error_list) {
    display_errors = [
      categoryInput.error_list.slug,
      categoryInput.error_list.language_id,
      categoryInput.error_list.parent_id,
      categoryInput.error_list.meta_title,
    ];
  }
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
    <div className="container px-4">
      <div className="card mt4">
        <div className="card-header">
          <h4 className="mt-4">
            Edit Category
            <Link
              to="/admin/view-category"
              className="btn btn-primary btn-sm float-end"
            >
              BACK
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            {language.map((item, index) => (
              <li className="nav-item" role="presentation">
                <button
                  className={`${index === 0 ? "nav-link active" : "nav-link"}`}
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
            <li className="nav-item" role="presentation">
              <button
                className={"nav-link"}
                id={`nav-data-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#nav-data`}
                type="button"
                role="tab"
                aria-controls={`nav-data`}
                aria-selected="true"
              >
                Data
              </button>
            </li>
          </ul>
          <form onSubmit={{ updateCategory }} id="CATEGORY_FORM">
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
                        <label>Slug</label>
                        <input
                          name="slug"
                          type="text"
                          onChange={handleInput}
                          value={categoryInput.slug}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label>Description</label>
                        <CKEditor
                          id={`desc_${index}`}
                          editor={ClassicEditor}
                          name="description"
                          className="form-control"
                          onChange={handleInput}
                          value={categoryInput.description}
                          data=""
                          onBlur={(event, editor) => {
                            //console.log("Blur.", editor);
                          }}
                          onFocus={(event, editor) => {
                            //console.log("Focus.", editor);
                          }}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label>Meta Title</label>
                        <input
                          name={`meta_title_${index}`}
                          className="form-control"
                          value={categoryInput.meta_title}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                className={"tab-pane fade"}
                id={`nav-data`}
                role="tabpanel"
                aria-labelledby={`nav-data`}
              >
                <div
                  className="tab-pane card-body border fade show active"
                  id={"data"}
                  role="tabpanel"
                  aria-labelledby={`${"data"}-tab`}
                >
                  <div className="form-group mb-3">
                    <label>Select Category</label>
                    <select
                      name="parent_id"
                      onChange={handleInput}
                      value={categoryInput.parent_id}
                      className="form-control"
                    >
                      {" "}
                      <option value="">-----Select Category--------</option>
                      {topcategory.map((item) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <small className="text-danger">{errorlist.parent_id}</small>
                  </div>

                  <div className="form-group mb-3 ">
                    <label>Status</label>
                    <input
                      name="status"
                      type="checkbox"
                      onChange={handleInput}
                      value={categoryInput.status}
                    />{" "}
                    (Status 0=Shown / 1=Hidden)
                  </div>
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

export default EditCategory;
