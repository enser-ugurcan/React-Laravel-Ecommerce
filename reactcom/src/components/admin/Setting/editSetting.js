import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Editsetting(props) {
  const [errorlist, setError] = useState([]);
  const [settinglist, setSettinglist] = useState([]);
  const [settingInput, setSetting] = useState({
    title: "",
    keyword: "",
    description: "",
    company: "",
    address: "",
    phone: "",
    fax: "",
    email: "",
    smtpserver: "",
    smtpemail: "",
    smtppassword: "",
    smtpport: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    aboutus: "",
    references: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setSetting({ ...settingInput, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios.get("/api/view-setting").then((res) => {
      if (res.data.status === 200) {
        setSettinglist(res.data.setting);
      }
    });

    const product_id = props.match.params.id;
    axios.get(`/api/edit-setting/${product_id}`).then((res) => {
      if (res.data.status === 200) {
        setSettinglist(res.data.setting);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  }, [props.match.params.id]);

  const updateSetting = (e) => {
    e.preventDefault();

    const id = props.match.params.id;

    const formData = new FormData();
    formData.append("title", settingInput.title);
    formData.append("keyword", settingInput.keyword);
    formData.append("description", settingInput.description);
    formData.append("company", settingInput.company);
    formData.append("address", settingInput.address);
    formData.append("phone", settingInput.phone);
    formData.append("fax", settingInput.fax);
    formData.append("email", settingInput.email);
    formData.append("smtpserver", settingInput.smtpserver);
    formData.append("smtpemail", settingInput.smtpemail);
    formData.append("smtppassword", settingInput.smtppassword);
    formData.append("smtpport", settingInput.smtpport);
    formData.append("facebook", settingInput.facebook);
    formData.append("instagram", settingInput.instagram);
    formData.append("twitter", settingInput.twitter);
    formData.append("youtube", settingInput.youtube);
    formData.append("aboutus", settingInput.aboutus);
    formData.append("reference", settingInput.references);

    axios.post(`/api/update-setting/${id}`, formData).then((res) => {
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
    <div className="card-body">
      <form onSubmit={updateSetting} encType="multipart/form-data">
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
              General
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
              Smtp Email
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
              Social Media
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="aboutus-tab"
              data-bs-toggle="tab"
              data-bs-target="#aboutus"
              type="button"
              role="tab"
              aria-controls="aboutus"
              aria-selected="false"
            >
              About Us
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
              <label>Title</label>
              <input
                type="text"
                name="title"
                onChange={handleInput}
                value={settingInput.title}
                className="form-control"
              />
              <small className="text-danger">{errorlist.title}</small>
            </div>
            <div className="form-group mb-3">
              <label>Keyword</label>
              <input
                type="text"
                name="keyword"
                onChange={handleInput}
                value={settingInput.keyword}
                className="form-control"
              />
              <small className="text-danger">{errorlist.keyword}</small>
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <input
                type="text"
                name="description"
                onChange={handleInput}
                value={settingInput.description}
                className="form-control"
              />
              <small className="text-danger">{errorlist.description}</small>
            </div>
            <div className="form-group mb-3">
              <label>Company</label>
              <input
                type="text"
                name="company"
                onChange={handleInput}
                value={settingInput.company}
                className="form-control"
              />
              <small className="text-danger">{errorlist.company}</small>
            </div>
            <div className="form-group mb-3">
              <label>Address</label>
              <input
                type="text"
                name="address"
                onChange={handleInput}
                value={settingInput.address}
                className="form-control"
              />
              <small className="text-danger">{errorlist.address}</small>
            </div>
            <div className="form-group mb-3">
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                onChange={handleInput}
                value={settingInput.phone}
                className="form-control"
              />
              <small className="text-danger">{errorlist.phone}</small>
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleInput}
                value={settingInput.email}
                className="form-control"
              />
              <small className="text-danger">{errorlist.email}</small>
            </div>
          </div>
          <div
            className="tab-pane card-body boder fade"
            id="otherdetails"
            role="tabpanel"
            aria-labelledby="otherdetails-tab"
          >
            <div className="row">
              <div className="form-group mb-3">
                <label>Smtp Server</label>
                <input
                  type="text"
                  name="smtpserver"
                  onChange={handleInput}
                  value={settingInput.smtpserver}
                  className="form-control"
                />
                <small className="text-danger">{errorlist.smtpserver}</small>
              </div>
              <div className="form-group mb-3">
                <label>Smtp Email</label>
                <input
                  type="text"
                  name="smtpemail"
                  onChange={handleInput}
                  value={settingInput.smtpemail}
                  className="form-control"
                />
                <small className="text-danger">{errorlist.smtpemail}</small>
              </div>
              <div className="form-group mb-3">
                <label>Smtp Password</label>
                <input
                  type="password"
                  name="smtppassword"
                  onChange={handleInput}
                  value={settingInput.smtppassword}
                  className="form-control"
                />
                <small className="text-danger">{errorlist.smtppassword}</small>
              </div>

              <div className="form-group mb-3">
                <label>Smtp Port</label>
                <input
                  type="text"
                  name="smtpport"
                  onChange={handleInput}
                  value={settingInput.smtpport}
                  className="form-control"
                />
                <small className="text-danger">{errorlist.smtpport}</small>
              </div>
            </div>
          </div>
          <div
            className="tab-pane card-body boder fade"
            id="attribute"
            role="tabpanel"
            aria-labelledby="attribute-tab"
          >
            <div className="form-group mb-3">
              <label>Fax</label>
              <input
                type="text"
                name="fax"
                onChange={handleInput}
                value={settingInput.fax}
                className="form-control"
              />
              <small className="text-danger">{errorlist.fax}</small>
            </div>
            <div className="form-group mb-3">
              <label>Facebook</label>
              <input
                type="text"
                name="facebook"
                onChange={handleInput}
                value={settingInput.facebook}
                className="form-control"
              />
              <small className="text-danger">{errorlist.facebook}</small>
            </div>
            <div className=" form-group mb-3">
              <label>Instagram</label>
              <input
                type="text"
                name="instagram"
                onChange={handleInput}
                value={settingInput.instagram}
                className="form-control"
              />
              <small className="text-danger">{errorlist.instagram}</small>
            </div>
            <div className="form-group mb-3">
              <label>Twitter</label>
              <input
                type="text"
                name="twitter"
                onChange={handleInput}
                value={settingInput.twitter}
                className="form-control"
              />
              <small className="text-danger">{errorlist.twitter}</small>
            </div>
            <div className=" form-group mb-3">
              <label>Youtube</label>
              <input
                type="text"
                name="youtube"
                onChange={handleInput}
                value={settingInput.youtube}
                className="form-control"
              />
              <small className="text-danger">{errorlist.youtube}</small>
            </div>
          </div>
          <div
            className="tab-pane card-body boder fade"
            id="aboutus"
            role="tabpanel"
            aria-labelledby="aboutus-tab"
          >
            <div className="form-group mb-3">
              <label>About Us</label>
              <textarea
                type="text"
                name="aboutus"
                onChange={handleInput}
                value={settingInput.aboutus}
                className="form-control"
              />
              <small className="text-danger">{errorlist.aboutus}</small>
            </div>
            <div className=" form-group mb-3">
              <label>References</label>
              <input
                type="text"
                name="references"
                onChange={handleInput}
                value={settingInput.references}
                className="form-control"
              />
              <small className="text-danger">{errorlist.references}</small>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Editsetting;
