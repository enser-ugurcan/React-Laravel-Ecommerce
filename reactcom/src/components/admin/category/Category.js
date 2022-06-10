import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Category() {
  const [language, setLanguage] = useState([]);
  const [category, setCategorylist] = useState([]);
  const [errorlist, setError] = useState([]);
  const [parent, setParent] = useState([]);
  const [parentNull, setParentNull] = useState([]);
  const [parentAll, setParentAll] = useState([]);
  const [topcategory, setTopcategory] = useState([]);
  const [categoryInput, setCategory] = useState({
    slug: "",
    language_id: "",
    parent_id: "",
    descrip: "",
    status: "",
    meta_title: "",
    error_list: [],
  });

  const [descriptions, setDescriptions] = useState({});

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios.get("/api/language").then((res) => {
      if (res.data.status === 200) {
        setLanguage(res.data.languages);

        //console.log(res.data.languages);
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
  // useEffect(() => {
  //   axios.get("/api/all-topcategory").then((res) => {
  //     if (res.data.status === 200) {
  //       setTopcategory(res.data.category);
  //     }
  //   });
  // }, []);

  const submitCategory = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    //console.log(data.values());
    const obj = Object.fromEntries(data.entries());
    const denem = { ...obj, ...descriptions };

    let arr = [];
    language.forEach((lang, index) => {
      const data = {
        language_id: lang.id,
        slug: denem[`slug_${index}`],
        parent_id: denem[`parent_id`],
        descrip: denem[`desc_${index}`],
        staus: denem[`status`],
        meta_title: denem[`meta_title_${index}`],
      };
      arr = [data, ...arr];
      // console.log(data.get(`slug_${index}`));
      // console.log(data.get(`desc_${index}`));
      // console.log(data.get(`meta_title_${index}`));
    });

    const obj2 = {
      status: denem["status"],
      parent_id: denem["parent_id"],
      category_desc_arr: arr,
    };

    axios.post("/api/store-category", obj2).then((res) => {
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
      categoryInput.error_list.slug,
      categoryInput.error_list.language_id,
      categoryInput.error_list.parent_id,
      categoryInput.error_list.meta_title,
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
              to="/admin/view-category"
              className="btn btn-primary btn-sm float-end"
            >
              View Category
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
          <form onSubmit={submitCategory} id="CATEGORY_FORM">
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
                          name={`slug_${index}`}
                          type="text"
                          className="form-control"
                        />
                        <span>{categoryInput.error_list.slug}</span>
                      </div>

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

                            oldData[`desc_${index}`] = editor.getData();
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
                      <div className="form-group mb-3">
                        <label>Title</label>
                        <input
                          name={`meta_title_${index}`}
                          className="form-control"
                        />
                        <span>{categoryInput.error_list.meta_title}</span>
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
                      {category.map((item) => {
                        return (
                          <option
                            value={item.category_id}
                            key={item.category_id}
                          >
                            {item.title}
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

export default Category;
