import React from "react";

import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Content() {
  return (
    <div id="root">
      <div
        id="carouselHomeBanner"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Carousel fade={true} pause={false}>
              <Carousel.Item interval={4000}>
                <img
                  className="d-block w-100"
                  src="https://n11scdn.akamaized.net/a1/928_515/22/05/31/55/16/73/87/47/24/98/58/62/43462731345343002720.jpg"
                  alt="Third slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <img
                  className="d-block w-100"
                  src="https://cartzilla.createx.studio/img/home/mono-product/hero-bg.jpg"
                  alt="Third slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <img
                  className="d-block w-100"
                  src="https://n11scdn.akamaized.net/a1/928_515/22/06/06/92/03/76/11/81/03/62/57/32/24021944612175888913.jpg"
                  alt="Third slide"
                />{" "}
              </Carousel.Item>
            </Carousel>
            <div className="carousel-caption d-none d-md-block">
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container-fluid bg-light mb-3">
        <div className="row g-1">
          <div className="col-md-9">
            <div
              id="elect-product-category"
              className="carousel slide mb-3"
              data-ride="carousel"
            ></div>
          </div>
        </div>
      </div>
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col">
              <div class="card shadow-sm">
                <Link>
                  {" "}
                  <img src="https://n11scdn.akamaized.net/a1/928_515/22/05/10/84/05/81/25/27/47/25/92/39/32701513747226444727.jpg" />{" "}
                </Link>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm">
                <Link to="collections/18">
                  <img src="https://cdn.dsmcdn.com/ty449/pimWidgetApi/mobile_20220606093324_Subatm12.jpg" />
                </Link>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm">
                <Link to="collections/18">
                  <img src="https://cdn.dsmcdn.com/ty448/campaign/banners/original/608061/73c19b84c7_0.jpg" />
                </Link>
              </div>
            </div>

            <div class="col">
              <div class="card shadow-sm">
                <Link to="collections/18">
                  <img src="https://cdn.dsmcdn.com/ty448/pimWidgetApi/mobile_20220606100210_2231488ElektronikMobile202206061201.jpg" />
                </Link>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm">
                <Link to="collections/19">
                  <img src="https://cdn.dsmcdn.com/ty441/pimWidgetApi/webBig_20220601082526_2215594ElektronikWeb202204141403.jpg" />
                </Link>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm">
                <Link to="collections/18">
                  <img src="https://cdn.dsmcdn.com/ty411/pimWidgetApi/webBig_20220429105620_2227015ElektronikWeb202204291.jpg" />
                </Link>
              </div>
            </div>

            <div class="col">
              <div class="card shadow-sm">
                <Link to="collections/18">
                  <img src="https://cdn.dsmcdn.com/ty439/pimWidgetApi/webBig_20220526080048_2227238ElektronikWeb202205101401.jpg" />
                </Link>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm">
                <Link to="collections/18">
                  <img src="https://cdn.dsmcdn.com/ty447/pimWidgetApi/webBig_20220606081136_2231473ElektronikWeb202206031705.jpg" />
                </Link>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm">
                <Link to="collections/18">
                  <img src="https://cdn.dsmcdn.com/ty447/pimWidgetApi/webBig_20220606081136_2231473ElektronikWeb202206031705.jpg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
