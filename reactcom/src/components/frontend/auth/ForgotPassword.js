import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function ForgotPasssword() {
  const history = useHistory();
  const [loginInput, setLogin] = useState({
    email: "",
  });
  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
    };
    axios.post(`api/forgot`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.token, "success");
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
                <h3 className="row justify-content-center">Forgot Password</h3>
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      value={loginInput.email}
                      className="form-control"
                      placeholder="example@hotmail.com"
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
export default ForgotPasssword;
