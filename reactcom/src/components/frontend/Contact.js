import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Contact() {
  const [errorlist, setError] = useState([]);
  const [ContactInput, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleInput = (e) => {
    e.persist();
    setContact({ ...ContactInput, [e.target.name]: e.target.value });
  };
  const submitContact = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", ContactInput.name);
    formData.append("email", ContactInput.email);
    formData.append("message", ContactInput.message);

    axios.post("/api/contact", formData).then((res) => {
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
    <div>
      <div class="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24234.99899219026!2d43.089003049999995!3d40.599552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2str!4v1643481249879!5m2!1sen!2str"
          width="600"
          height="450"
          allowfullscreen=""
          tabindex="0"
        ></iframe>
      </div>
      <section class="contact spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="contact__text">
                <div class="section-title">
                  <span>Information</span>
                  <h2>Contact Us</h2>
                  <p>
                    As you might expect of a company that began as a high-end
                    interiors contractor, we pay strict attention.
                  </p>
                </div>
                <ul>
                  <li>
                    <h4>Turkey</h4>
                    <p>
                      195 E Dr, Enser Uğurcan ATEŞÇAKMAK,
                      <br />
                      +90 530000000
                    </p>
                  </li>
                  <li>
                    <h4>Turkey</h4>
                    <p>
                      109,Muhammet Berke OKUMUŞ <br />
                      +90 530000000
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="contact__form">
                <form onSubmit={submitContact} encType="multipart/form-data">
                  <div class="row">
                    <div class="col-lg-6">
                      <input
                        type="text"
                        name="name"
                        onChange={handleInput}
                        value={ContactInput.name}
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div class="col-lg-6">
                      <input
                        type="email"
                        name="email"
                        onChange={handleInput}
                        value={ContactInput.email}
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div class="col-lg-12">
                      <textarea
                        type="text"
                        name="message"
                        onChange={handleInput}
                        value={ContactInput.message}
                        className="form-control"
                        placeholder="Message"
                      ></textarea>
                      <button type="submit" class="site-btn">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Contact;
