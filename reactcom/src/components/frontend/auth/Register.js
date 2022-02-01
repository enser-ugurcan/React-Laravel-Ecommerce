import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();

  const [RegisterInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...RegisterInput, [e.target.name]: e.target.value });
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: RegisterInput.name,
      email: RegisterInput.email,
      password: RegisterInput.password,
      c_password: RegisterInput.c_password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          history.push("/");
        } else {
          setRegister({
            ...RegisterInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="row justify-content-center align-items-center">
                  BECOME A BEFA MEMBER
                </h3>
                <br />
                <div className="m-auto w-75 text-justify-center text-muted">
                  Be the first to access Befa's best products by creating your
                  Befa Member profile, access the community and be inspired.
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label>Full Name</label>
                    <input
                      type=""
                      name="name"
                      onChange={handleInput}
                      value={RegisterInput.name}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      value={RegisterInput.email}
                      className="form-control"
                      placeholder="example@hotmail.com"
                    />
                    <span>{RegisterInput.error_list.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleInput}
                      value={RegisterInput.password}
                      className="form-control"
                    />
                    <span>{RegisterInput.error_list.password}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="c_password"
                      onChange={handleInput}
                      value={RegisterInput.c_password}
                      className="form-control"
                    />
                    <span>{RegisterInput.error_list.c_password}</span>
                  </div>
                  <div className="form-group bm-3">
                    <button type="submit" className="w-25 btn btn-dark">
                      Register
                    </button>
                  </div>
                  <br />
                  <span className="small">
                    Already have an account ?{" "}
                    <Link className="" to="/login">
                      {" "}
                      Login
                    </Link>
                  </span>
                  <br />
                  <br />
                  <span className="small">
                    By signing up, you are creating a Sendinblue account, and
                    you agree to BEFA's <Link to="/terms">Terms of Use</Link>{" "}
                    and <Link to="/privacy">Privacy Policy</Link>{" "}
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
