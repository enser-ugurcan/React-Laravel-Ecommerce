import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

function ViewProduct(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  const productCount = product.length;

  useEffect(() => {
    let isMountered = true;
    const product_slug = props.match.params.slug;
    axios.get(`/api/fetchproducts/${product_slug}`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setProduct(res.data.product_data.product);
          setCategory(res.data.product_data.category);
          setLoading(false);
        } else if (res.data.status === 400) {
          swal("Warning", res.data.message, "");
        } else if (res.data.status === 404) {
          history.push("/collections");
          swal("Warning", res.data.message, "error");
        }
      }
    });

    return () => {
      isMountered = false;
    };
  }, [props.match.params.slug, history]);
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
          Loading Category...
        </Button>
      </h4>
    );
  } else {
    var showProductList = "";
    if (productCount) {
      showProductList = product.map((item, idx) => {
        return (
          <div className="col-md-4" key={idx}>
            <div className="card">
              <div className="card h-200 shadow-sm">
                <Link to={`/collections/${item.category.slug}/${item.name}`}>
                  <img
                    src={`http://localhost:8000/${item.image}`}
                    className="mx-auto d-block w-50"
                    alt={item.name}
                  />
                </Link>
                <div className="label-top shadow-sm">
                  <Link
                    to={`/collections/${item.category.slug}/${item.name}`}
                    className="text-white text-decoration-none"
                  >
                    Kargo Bedava
                  </Link>
                </div>
                <div className="card-body">
                  <div className="clearfix mb-5 mt-3">
                    <h5 className="card-title">
                      <Link
                        to={`/collections/${item.category.slug}/${item.name}`}
                      >
                        {item.description}
                      </Link>
                    </h5>
                    <span className="float-start badge rounded-pill bg-success">
                      {item.selling_price}$
                    </span>
                    <del className="small text-muted float-start badge rounded-pill">
                      {item.original_price}$
                    </del>
                  </div>
                  <div className="card">
                    <div className="text">
                      <label>10% discount on cart</label>
                    </div>
                  </div>
                  <div className="d-grid gap-2 my-4">
                    <Link
                      to={`/collections/${item.category.slug}/${item.name}`}
                      className="btn btn-warning bold-btn"
                    >
                      View Product
                    </Link>
                  </div>
                  <div className="clearfix mb-1">
                    <span className="float-start">
                      <Link to="/#">
                        <i className="fas fa-question-circle"></i>
                      </Link>
                    </span>

                    <span className="float-end">
                      <i className="far fa-heart"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      showProductList = (
        <div className="col-md-12">
          <h4>No Product Available for {category.name}</h4>
        </div>
      );
    }
  }
  var filters = "";
  if (productCount) {
    filters = product.map((item, idx) => {
      return (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {" "}
            <Link className="text-black-50 text-decoration-none">
              {item.brand}
            </Link>
          </li>
        </ul>
      );
    });
  }
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="bg-warning breadcrumb rounded-0 px-3 py-2">
          <li className="breadcrumb-item ">
            <Link className="text-decoration-none" to="/">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link className="text-decoration-none" to="/Collections">
              {category.name}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/#" className="text-decoration-none">
              {category.slug}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="container-fluid mb-3">
        <div className="row">
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="font-monospace fw-bold card-header font-weight-bold text-uppercase">
                Related categories
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Link to="/#" className="text-decoration-none stretched-link">
                    {category.slug}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-12 mb-4">
              <form className="d-flex">
                <div className="input-group">
                  <input
                    id="search"
                    name="search"
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    required
                  />
                  <button className="btn btn-outline-primary" type="submit">
                    {" "}
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </form>
            </div>
            <div className="card mb-3">
              <div className="card-header fw-bold text-uppercase">Brand</div>
              {filters}
            </div>
            <div className="card mb-3">
              <div className="fw-bold card-header font-weight-bold text-uppercase">
                FILTER PRICE
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="shop__sidebar__price">
                    <ul>
                      <li>
                        <a href="#">$0.00 - $50.00</a>
                      </li>
                      <li>
                        <a href="#">$50.00 - $100.00</a>
                      </li>
                      <li>
                        <a href="#">$100.00 - $150.00</a>
                      </li>
                      <li>
                        <a href="#">$150.00 - $200.00</a>
                      </li>
                      <li>
                        <a href="#">$200.00 - $250.00</a>
                      </li>
                      <li>
                        <a href="#">250.00+</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card mb-3">
              <div className="fw-bold card-header font-weight-bold text-uppercase">
                SIZE
              </div>

              <li className="list-group-item">
                <select name="category_id" className="form-control">
                  <option>xxs</option>
                  <option>xs</option>
                  <option>s</option>
                  <option>m</option>
                  <option>l</option>
                  <option>l-xl</option>
                  <option>xl</option>
                  <option>xxl</option>
                  <option>2xl</option>
                  <option>3xl</option>
                  <option>4xl</option>
                  <option>5xl</option>
                  <option>6xl</option>
                  <option>7xl</option>
                  <option>35-cm</option>
                  <option>40-cm</option>
                  <option>42-cm</option>
                  <option>44-cm</option>
                  <option>45-cm</option>
                  <option>48-cm</option>
                  <option>50-cm</option>
                  <option>0-ay</option>
                  <option>1-ay</option>
                  <option>2-ay</option>
                  <option>3-ay</option>
                  <option>1 yas</option>
                  <option>2 yas</option>
                  <option>3 yas</option>
                  <option>45</option>
                  <option>37</option>
                  <option>38</option>
                  <option>39</option>
                  <option>40</option>
                  <option>41</option>
                  <option>42</option>
                  <option>43</option>
                  <option>44</option>
                </select>
              </li>
            </div>
            <div className="card mb-3">
              <div className="font-monospace fw-bold card-header font-weight-bold text-uppercase">
                COLORS
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="shop__sidebar__color">
                    <label className="c-1" for="sp-1">
                      <input type="radio" id="sp-1" />
                    </label>
                    <label className="c-2" for="sp-2">
                      <input type="radio" id="sp-2" />
                    </label>
                    <label className="c-3" for="sp-3">
                      <input type="radio" id="sp-3" />
                    </label>
                    <label className="c-4" for="sp-4">
                      <input type="radio" id="sp-4" />
                    </label>
                    <label className="c-5" for="sp-5">
                      <input type="radio" id="sp-5" />
                    </label>
                    <label className="c-6" for="sp-6">
                      <input type="radio" id="sp-6" />
                    </label>
                    <label className="c-7" for="sp-7">
                      <input type="radio" id="sp-7" />
                    </label>
                    <label className="c-8" for="sp-8">
                      <input type="radio" id="sp-8" />
                    </label>
                    <label className="c-9" for="sp-9">
                      <input type="radio" id="sp-9" />
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row">
              <div className="col-md-8">
                <span className="align-middle font-weight-bold ">
                  {productCount} result for
                  <span className="text-warning mx-2">"{category.slug}"</span>
                </span>
              </div>
              <div className="col-md-4">
                <select
                  className="form-select w-100 float-left"
                  aria-label="Default select"
                >
                  <option value="1">Most Popular</option>
                  <option value="2">Latest items</option>
                  <option value="3">Price low to high</option>
                  <option value="4">Price high to low</option>
                </select>
              </div>
            </div>
            <hr />
            <div className="row g-4">{showProductList}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
