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

function Footer() {
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
          <footer className="text-center text-lg-start bg-dark text-white">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
              <div className="me-5 d-none d-lg-block">
                <span>Get connected with us on social networks:</span>
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
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                      <i className="fas fa-gem me-3"></i>
                      {item.title}
                    </h6>
                    <p>{item.description}</p>
                  </div>
                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                      Social Media
                    </h6>
                    <p>
                      <FaInstagram className="mx-1" />
                      <Link to="#!" className="text-reset">
                        {item.instagram}
                      </Link>
                    </p>
                    <p>
                      <FaFacebook className="mx-1" />
                      <Link to="#!" className="text-reset">
                        {item.facebook}
                      </Link>
                    </p>
                    <p>
                      <FaTwitter className="mx-1" />
                      <Link to="#!" className="text-reset">
                        {item.twitter}
                      </Link>
                    </p>
                    <p>
                      <FaYoutube className="mx-1" />
                      <Link to="#!" className="text-reset">
                        {item.youtube}
                      </Link>
                    </p>
                  </div>
                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                    <p>
                      Email :
                      <Link to="#!" className="text-reset">
                        {item.email}
                      </Link>
                    </p>
                    <p>
                      Phone Number :
                      <Link to="#!" className="text-reset">
                        {item.phone}
                      </Link>
                    </p>
                  </div>

                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                    <p>
                      <i className="fas fa-home me-3"></i> 100.Yıl , Karabuk ,
                      Turkey
                    </p>
                    <p>
                      <i className="fas fa-envelope me-3"></i>
                      befa@hotmail.com
                    </p>
                    <p>
                      <i className="fas fa-phone me-3"></i> + 01 234 567 88
                    </p>
                    <p>
                      <i className="fas fa-print me-3"></i> + 01 234 567 89
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
export default Footer;
