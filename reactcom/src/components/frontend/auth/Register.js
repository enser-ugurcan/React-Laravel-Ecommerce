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
      <div className="card-body">
        <section class="vh-100">
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-lg-12 col-xl-11">
                <div class="card text-black">
                  <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                      <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Sign up
                        </p>

                        <form class="mx-1 mx-md-4" onSubmit={registerSubmit}>
                          <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                name="name"
                                onChange={handleInput}
                                value={RegisterInput.name}
                                className="form-control"
                                placeholder="Your Name"
                              />
                            </div>
                          </div>

                          <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                name="email"
                                onChange={handleInput}
                                value={RegisterInput.email}
                                className="form-control"
                                placeholder="example@hotmail.com"
                                placeholder="E-mail"
                              />
                              <span>{RegisterInput.error_list.email}</span>
                            </div>
                          </div>

                          <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                name="password"
                                onChange={handleInput}
                                value={RegisterInput.password}
                                className="form-control"
                                placeholder="Password"
                              />
                              <span>{RegisterInput.error_list.password}</span>
                            </div>
                          </div>

                          <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                name="c_password"
                                onChange={handleInput}
                                value={RegisterInput.c_password}
                                className="form-control"
                                placeholder="Repeat your password"
                              />
                              <span>{RegisterInput.error_list.c_password}</span>
                            </div>
                          </div>

                          <div class="form-check  mb-5">
                            <span className="small">
                              By signing up, you are creating a Sendinblue
                              account, and you agree to BEFA's{" "}
                              <Link to="/terms">Terms of Use</Link> and{" "}
                              <Link to="/privacy">Privacy Policy</Link>{" "}
                            </span>
                            <br />
                            <br />
                            <span className="small">
                              Already have an account ?{" "}
                              <Link className="link-success " to="/login">
                                {" "}
                                Login
                              </Link>
                            </span>
                          </div>

                          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              {" "}
                              Register
                            </button>
                          </div>
                        </form>
                      </div>
                      <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          class="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Register;
