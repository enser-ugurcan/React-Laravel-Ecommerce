import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          //swal("Success", res.data.message,"success");
          if (res.data.role === "admin") {
            history.push("/admin/dashboard");
          } else {
            history.push("/");
          }
        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {" "}
                <section class="vh-100">
                  <div class="container-fluid h-custom">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login
                      </p>
                      <div class="col-md-9 col-lg-6 col-xl-5">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                          class="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={loginSubmit}>
                          <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                            <p class="lead fw-normal mb-0 me-3">Sign in with</p>
                            <button
                              type="button"
                              class="btn btn-primary btn-floating mx-1"
                            ></button>

                            <button
                              type="button"
                              class="btn btn-primary btn-floating mx-1"
                            ></button>

                            <button
                              type="button"
                              class="btn btn-primary btn-floating mx-1"
                            ></button>
                          </div>

                          <div class="divider d-flex align-items-center my-4">
                            <p class="text-center fw-bold mx-3 mb-0">Or</p>
                          </div>

                          <div class="form-outline mb-4">
                            <input
                              type="email"
                              name="email"
                              onChange={handleInput}
                              value={loginInput.email}
                              className="form-control form-control-lg"
                              placeholder="example@hotmail.com"
                            />
                            <span>{loginInput.error_list.email}</span>
                          </div>

                          <div class="form-outline mb-3">
                            <input
                              type="password"
                              name="password"
                              onChange={handleInput}
                              value={loginInput.password}
                              className="form-control form-control-lg"
                              placeholder="Enter password"
                            />
                            <span>{loginInput.error_list.password}</span>
                          </div>

                          <div class="d-flex justify-content-between align-items-center">
                            <div class="form-check mb-0"></div>
                            <Link className="text-dark" to="/forgotPassword">
                              Forgot password?
                            </Link>
                          </div>

                          <div class="text-center text-lg-start mt-4 pt-2">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              Login
                            </button>

                            <p class="small fw-bold mt-2 pt-1 mb-0">
                              Don't have an account?
                              <Link className="link-danger " to="/register">
                                Create New
                              </Link>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
