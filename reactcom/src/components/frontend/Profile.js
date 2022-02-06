import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function Profile() {
  if (!localStorage.getItem("auth_token")) {
    history.push("/");
    swal("Warning", "Login to go to User Page", "error");
  }

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [user, setUserr] = useState("");
  const [errorlist, setError] = useState([]);
  const [picture, setPicture] = useState([]);
  const [userInput, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone_number: "",
    birthday: "",
  });
  const handleInput = (e) => {
    e.persist();
    setUser({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  useEffect(() => {
    axios.get(`/api/userprofile`).then((res) => {
      if (res.data.status === 200) {
        setUserr(res.data.user);
        setLoading(false);
      } else if (res.data.status === 401) {
        history.push("/");
        swal("Warning", res.data.message, "error");
      }
      setLoading(false);
    });
  });
  const UpdateUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userInput.name);
    formData.append("email", userInput.email);
    formData.append("address", userInput.address);
    formData.append("phone_number", userInput.phone_number);
    formData.append("birthday", userInput.birthday);
    formData.append("image", picture.image);
    axios.post(`/api/update-user`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setError([]);
      } else if (res.data.status === 422) {
        swal("all fields are mandatory", "", "error");
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/profile");
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
          Loading User İnformation...
        </Button>
      </h4>
    );
  } else {
    var showuser = [];
    showuser = user.map((item) => {
      return (
        <div className="container-xl px-4 mt-4">
          <nav className="nav nav-borders">
            <Link className="nav-link active ms-0" to="">
              Profile İnformation
            </Link>
          </nav>
          <hr className="mt-0 mb-4" />
          <div className="row">
            <div className="col-xl-4">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header" key={item.id}>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-person-lines-fill"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
                    ></path>
                  </svg>
                  Profile Detail
                </div>
                <div className="card-body">
                  <div className="d-md-flex justify-content-between align-items-center text-center p-4">
                    <div className="mx-auto d-block align-items-center">
                      <div className="img-thumbnail position-relative flex-shrink-0">
                        <span
                          className="badge bg-warning position-absolute end-0 mt-n2"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Reward points"
                        >
                          {item.id}
                        </span>
                        <img
                          className="img-thumbnail"
                          src={`http://localhost:8000/${item.image}`}
                          width="150px"
                          name="image"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <form>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-12">
                        <label className="small mb-1">Full name</label>
                        <input
                          className="form-control"
                          id="inputFirstName"
                          type="text"
                          placeholder="Enter your first name"
                          value={item.name}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1">Email address</label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        type="email"
                        placeholder="Enter your email address"
                        value={item.email}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card mb-4">
                <div className="card-header">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-person-lines-fill"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
                    ></path>
                  </svg>
                  Account Details
                </div>
                <div className="card-body">
                  <form onSubmit={UpdateUser} encType="multipart/form-data">
                    <div className="row gx-3 mb-3">
                      <div className="col-md-12">
                        <label className="small mb-1">Full name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleInput}
                          value={userInput.name}
                          className="form-control"
                          placeholder="Enter your Full name"
                        />
                        <small className="text-danger">{errorlist.name}</small>
                      </div>
                    </div>
                    <div className="row gx- mb-3">
                      <div className="mb-3">
                        <label className="small mb-1">Email address</label>
                        <input
                          name="email"
                          onChange={handleInput}
                          value={userInput.email}
                          className="form-control"
                          placeholder="Enter your email address"
                        />
                        <small className="text-danger">{errorlist.email}</small>
                      </div>
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1">Location</label>
                        <input
                          name="address"
                          onChange={handleInput}
                          value={userInput.address}
                          className="form-control"
                          placeholder="Enter your location"
                        />
                        <small className="text-danger">
                          {errorlist.address}
                        </small>
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1">İmage</label>
                        <input
                          type="file"
                          name="image"
                          onChange={handleImage}
                          className="form-control"
                        />
                        <small className="text-danger">{errorlist.image}</small>
                      </div>
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1">Phone number</label>
                        <input
                          name="phone_number"
                          onChange={handleInput}
                          value={userInput.phone_number}
                          className="form-control"
                          placeholder="Enter your phone number"
                        />
                        <small className="text-danger">
                          {errorlist.phone_number}
                        </small>
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1">Birthday</label>
                        <input
                          name="birthday"
                          onChange={handleInput}
                          value={userInput.birthday}
                          className="form-control"
                          placeholder="Enter your birthday"
                        />
                        <small className="text-danger">
                          {errorlist.birthday}
                        </small>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary px-4 mt-2">
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return <div>{showuser}</div>;
}
export default Profile;
