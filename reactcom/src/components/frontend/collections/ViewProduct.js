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
import XMLParser from "react-xml-parser";
import { useTheme, useThemeUpdate } from "../../../Contexts/CurrencyContext";
import { YearViewService } from "@progress/kendo-react-dateinputs/dist/npm/calendar/services";
import GlobalContext from "../../../Contexts/GlobalContext";
import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";

const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=6f398b79d13b5c3d9b17c0d6b9832ece";

function ViewProduct(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [trcategory, setTrCategory] = useState([]);
  const [productDescription, setproductDescription] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [price, setPrice] = useState([]);
  const [pricelow, setPricelow] = useState([]);
  const [brand, setBrand] = useState([]);
  const [parent, setParent] = useState([]);
  const [commentt, setCommentt] = useState([]);

  const darkTheme = useTheme();
  const currencySymbols = [
    {
      name: "EUR",
      symbol: "€",
    },
    {
      name: "TRY",
      symbol: "₺",
    },
    {
      name: "USD",
      symbol: "$",
    },
  ];

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyOptions([data.rates]);
      });
  }, []);
  const productCount = product.length;

  const fullCurrency = (symbol) => {
    let t = "";
    currencySymbols.forEach((v) => {
      if (v["name"] == symbol) {
        t = v["symbol"];
      }
    });
    return t;
  };

  const adjustCurrency = (currency) => {
    for (const [key, value] of Object.entries(currencyOptions[0])) {
      if (key == darkTheme) {
        const s = fullCurrency(key);
        return `${s} ` + Math.floor(currency * value);
      }
    }
  };

  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    let isMountered = true;
    const product_slug = props.match.params.slug;
    //    const id = props.match.params.id;
    console.log(props.match.params);
    axios
      .get(`/api/fetchproducts/${product_slug}?lang=${globalContext.language}`)
      .then((res) => {
        if (isMountered) {
          if (res.data.status === 200) {
            setProduct(res.data.product_data.product);
            setCategory(res.data.product_data.category);
            setPrice(res.data.product_data.price);
            setPricelow(res.data.product_data.priceLow);
            setBrand(res.data.product_data.brand);
            setParent(res.data.product_data.parent_id);
            setCommentt(res.data.ValueOfCommentRating);
            console.log(res.data.product_data.product);
            console.log(res.data.ValueOfCommentRating);
            console.log(res.data.product_data.parent_id);
            console.log(res.data.product_data.category);
            console.log(res.data.product_data.product);
            console.log(res.data.product_data.brand);
            console.log(res.data.product_data.price);
            console.log(res.data.product_data.priceLow);
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
  var filters = "";
  if (productCount) {
    filters = product.map((item, idx) => {
      return (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link className="text-black-50 text-decoration-none">
              {item.brand}
            </Link>
          </li>
        </ul>
      );
    });
  }
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
          Kategori yükleniyor
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
                  <Link to={`/collections/${item.category.id}/${item.id}`}>
                    <img
                      src="https://cartzilla.createx.studio/img/home/mono-product/hero-bg.jpg"
                      className="mx-auto d-block w-50"
                      alt={item.name}
                    />
                  </Link>
                  <div class="product-action">
                    <Link to={`/collections/${item.category.id}/${item.id}`}>
                      <FcSearch />
                    </Link>
                  </div>
                </div>
                <div class="product-content text-center">
                  <h3>
                    <Link to={`/collections/${item.category.id}/${item.id}`}>
                      {item.name}
                    </Link>
                  </h3>

                  <div class="price">
                    <span>{adjustCurrency(item.selling_price)}</span>
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
                      <div class="cart-pro">Quick View</div>
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
          <h4>No Product Available for {category.slug}</h4>
        </div>
      );
    }
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
              {category.parent_id}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to={`/collections/${category.slug}`}
              className="text-decoration-none"
            >
              {category.id}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="container-fluid mb-3">
        <div className="row">
          {/* <div className="col-md-">
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
                  categoryres
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
              <div className="card-header fw-bold text-uppercase"></div>
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
          </div> */}

          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8">
                <span className="align-middle font-weight-bold ">
                  {productCount} result for Product
                </span>
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
