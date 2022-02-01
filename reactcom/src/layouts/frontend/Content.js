import React from "react";
import image4 from "../../images/4.png";
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
                <img className="d-block w-100" src={image4} alt="Third slide" />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <img
                  className="d-block w-100"
                  src="https://cartzilla.createx.studio/img/home/mono-product/hero-bg.jpg"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <img
                  className="d-block w-100"
                  src="https://e-commerce-template.surge.sh/images/banner/Laptops.webp"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
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
        <div className="row g-3">
          <div className="col-md-9">
            <div
              id="elect-product-category"
              className="carousel slide mb-3"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row g-3">
                    <div className="col-md-3">
                      <Link
                        to="collections/laptop"
                        className="text-decoration-none"
                      >
                        <div className="card text-center">
                          <div className="card-body">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="display-1 text-primary"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M13.5 3h-11a.5.5 0 0 0-.5.5V11h12V3.5a.5.5 0 0 0-.5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11z"
                              ></path>
                              <path d="M0 12h16v.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5V12z"></path>
                            </svg>
                            <h6 className="card-title text-capitalize">
                              Laptop
                            </h6>
                            <div className="card-text text-success">
                              {" "}
                              Upto 20% off
                            </div>
                            <small className="text-muted">
                              Sony, Dell, Lenovo
                            </small>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-3">
                      <Link to="collections" className="text-decoration-none">
                        <div className="card text-center">
                          <div className="card-body">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="display-1 text-secondary"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 1a5 5 0 0 0-5 5v4.5H2V6a6 6 0 1 1 12 0v4.5h-1V6a5 5 0 0 0-5-5z"
                              ></path>
                              <path d="M11 8a1 1 0 0 1 1-1h2v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V8zM5 8a1 1 0 0 0-1-1H2v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8z"></path>
                              <path
                                fillRule="evenodd"
                                d="M13.5 8.5a.5.5 0 0 1 .5.5v3a2.5 2.5 0 0 1-2.5 2.5H8a.5.5 0 0 1 0-1h3.5A1.5 1.5 0 0 0 13 12V9a.5.5 0 0 1 .5-.5z"
                              ></path>
                              <path d="M6.5 14a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1z"></path>
                            </svg>
                            <h6 className="card-title text-capitalize">
                              Headset
                            </h6>
                            <div className="card-text text-success">
                              {" "}
                              Upto 50% off
                            </div>
                            <small className="text-muted">
                              Sony, Dell, Lenovo
                            </small>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-3">
                      <Link
                        to="collections/Mobile"
                        className="text-decoration-none"
                      >
                        <div className="card text-center">
                          <div className="card-body">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="display-1 text-danger"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11 1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"
                              ></path>
                              <path
                                fillRule="evenodd"
                                d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                              ></path>
                            </svg>
                            <h6 className="card-title text-capitalize">
                              Phone
                            </h6>
                            <div className="card-text text-success">
                              {" "}
                              Upto 20% off
                            </div>
                            <small className="text-muted">
                              Sony, Dell, Lenovo
                            </small>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-3">
                      <Link
                        to="collections/Television"
                        className="text-decoration-none"
                      >
                        <div className="card text-center">
                          <div className="card-body">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="display-1 text-warning"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"
                              ></path>
                              <path d="M0 12h16v.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5V12z"></path>
                            </svg>
                            <h6 className="card-title text-capitalize">TV</h6>
                            <div className="card-text text-success">
                              {" "}
                              Upto 20% off
                            </div>
                            <small className="text-muted">
                              Sony, Dell, Lenovo
                            </small>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Content;
