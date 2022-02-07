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
import { FcSearch } from "react-icons/fc";

function ViewProduct(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const productCount = product.length;

  const submitAddtoWishlist = (e) => {
    e.preventDefault();
    const data = {
      product_id: product.id,
      product_qty: quantity,
    };
    axios.post(`api/add-to-wishlist`, data).then((res) => {
      if (res.data.status === 201) {
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        swal("Warning", res.data.message, "warning");
      } else if (res.data.status === 401) {
        swal("Error", res.data.message, "error");
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "warning");
      }
    });
  };
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
          <div className="col-md-4 " key={idx}>
            <div className="card mb-5">
              <div class="product-wrapper">
                <div class="product-img">
                  <Link to={`/collections/${item.category.slug}/${item.name}`}>
                    {" "}
                    <img
                      src={`http://localhost:8000/${item.image}`}
                      className="mx-auto d-block w-50"
                      alt={item.name}
                    />
                  </Link>
                  <div class="product-action">
                    <Link
                      to={`/collections/${item.category.slug}/${item.name}`}
                    >
                      <FcSearch />
                    </Link>
                  </div>
                </div>
                <div class="product-content text-center">
                  <h3>
                    <a href="#">{item.description}</a>
                  </h3>
                  <div class="rating">
                    <i class="fas far fa-star"></i>
                    <i class="fas far fa-star"></i>
                    <i class="fas far fa-star"></i>
                    <i class="fas far fa-star"></i>
                    <i class="fas far fa-star"></i>
                  </div>
                  <div class="price">
                    <span>$ {item.selling_price} </span>
                    <span>
                      <del>${item.original_price}</del>
                    </span>
                  </div>
                  <div class="cart-btn">
                    <form action="" method="POST" class="cart-and-action">
                      <div class="">
                        <div class="float-left">
                          <input
                            type="hidden"
                            name="product_quantity"
                            value="1"
                          />
                          <input type="hidden" name="product_id" value="" />
                        </div>
                      </div>
                      <div class="cart-pro">
                        <button
                          class="btn btn-outline-dark btn-lg "
                          type="submit"
                        >
                          Sepette %10 İndirim
                        </button>
                      </div>
                    </form>
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
            <Link
              to={`/collections/${category.slug}`}
              className="text-decoration-none"
            >
              {category.name}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to={`/collections/${category.slug}`}
              className="text-decoration-none"
            >
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
            <div className="container">
              <div className="row">{showProductList}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
