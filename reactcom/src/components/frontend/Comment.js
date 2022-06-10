import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import swal from "sweetalert";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import ImageZoom from "react-image-zooom";
import ReactStars from "react-stars";

function Comment(props) {
  const history = useHistory();
  if (!localStorage.getItem("auth_token")) {
    history.push("/");
    swal("Warning", "Login to go to Cooment Page", "error");
  }
  const [errorlist, setError] = useState([]);
  const [CommentInput, setComment] = useState({
    name: "",
    email: "",
    comment: "",
    rating: "",
  });
  const handleInput = (e) => {
    e.persist();
    setComment({ ...CommentInput, [e.target.name]: e.target.value });
  };
  const submitComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", CommentInput.name);
    formData.append("email", CommentInput.email);
    formData.append("rating", CommentInput.rating);
    formData.append("comment", CommentInput.comment);
    const category_slug = props.match.params.category;
    const product_name = props.match.params.product;
    const id = props.match.params.id;
    axios
      .post(
        `/api/viewproductdetails/${category_slug}/${product_name}/${id}/comment`,
        formData
      )
      .then((res) => {
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
      <div className="card mt-5">
        <div className="mx-5">
          <div class="col-lg-10 col-md-6 mb-5">
            <div onSubmit={submitComment} class="contact__form">
              <form encType="multipart/form-data">
                <div class="row">
                  <div class="col-lg-4">
                    <input
                      type="text"
                      onChange={handleInput}
                      value={CommentInput.name}
                      name="name"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div class="col-lg-4">
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      value={CommentInput.email}
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div class="col-lg-4">
                    <input
                      type="text"
                      name="rating"
                      onChange={handleInput}
                      value={CommentInput.rating}
                      className="form-control"
                      placeholder="Rating (1-5)"
                    />
                  </div>
                  <div class="col-lg-12">
                    <textarea
                      type="text"
                      name="comment"
                      onChange={handleInput}
                      value={CommentInput.comment}
                      className="form-control"
                      placeholder="Add a comment..."
                    ></textarea>
                    <button type="submit" class="site-btn">
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
