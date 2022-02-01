import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function ResetPassword(props) {
  const history = useHistory();
  const [loginInput, setLogin] = useState({
    token: "",
    password: "",
    c_password: "",
  });
  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      token: loginInput.token,
      password: loginInput.password,
      c_password: loginInput.c_password,
    };
    axios.post(`api/reset`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        history.push("/resetPassword");
      } else if (res.data.status === 400) {
        swal("Warning", res.data.message, "warning");
      }
    });
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="row justify-content-center">Reset Password</h3>
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="form-group mb-3">
                    <label>Token</label>
                    <input
                      type="text"
                      name="token"
                      onChange={handleInput}
                      className="form-control"
                      placeholder="Your Token"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleInput}
                      className="form-control"
                      placeholder="password"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="c_password"
                      onChange={handleInput}
                      className="form-control"
                      placeholder="confirm password"
                    />
                  </div>
                  <div className="form-group bm-3">
                    <button type="submit" className="w-25 btn btn-dark">
                      Submit
                    </button>
                  </div>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;
