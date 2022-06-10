import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGoogle,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

function About() {
  const [setting, setSetting] = useState([]);

  useEffect(() => {
    axios.get("/api/view-setting").then((res) => {
      if (res.data.status === 200) {
        setSetting(res.data.setting);

        //console.log(res.data.languages);
      }
    });
  }, []);

  return (
    <div className="root">
      {setting.map((item) => {
        return (
          <footer className="text-center text-lg-start bg-light text-white">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
              <div className="me-5 d-none d-lg-block">
                <span className="text-dark"> {item.company}</span>
              </div>

              <div>
                <Link to="" className="me-4 text-reset">
                  <FaFacebook />
                </Link>
                <Link to="" className="me-4 text-reset">
                  <FaTwitter />
                </Link>
                <Link to="" className="me-4 text-reset">
                  <FaInstagram />
                </Link>
                <Link to="" className="me-4 text-reset">
                  <FaGoogle />
                </Link>
                <Link to="" className="me-4 text-reset">
                  <FaGithub />
                </Link>
                <Link to="" className="me-4 text-reset">
                  <FaLinkedin />
                </Link>
              </div>
            </section>

            <section className="">
              <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                  <div className="col-md-4 col-lg-4 col-xl-12 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4 text-dark">
                      About Us
                    </h6>
                    <p>
                      <p to="#!" className="text-dark">
                        {item.aboutus}
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="text-center p-4">
              © 2021 Copyright:
              <Link className="text-reset fw-bold" to="http://localhost:3000/">
                Befa.com
              </Link>
            </div>
          </footer>
        );
      })}
    </div>
  );
}
export default About;
