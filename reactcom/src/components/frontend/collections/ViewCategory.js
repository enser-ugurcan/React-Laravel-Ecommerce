import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import GlobalContext from "../../../Contexts/GlobalContext";

function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [Ecategory, setEngCategory] = useState([]);

  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    let isMountered = true;
    axios.get(`/api/getCategory?lang=${globalContext.language}`).then((res) => {
      //  console.log(`/api/getCategory?lang=${globalContext.language}`);
      if (isMountered) {
        if (res.data.status === 200) {
          setCategories(res.data.categories);
          setCategory(res.data.category);
          setLoading(false);
        }
      }
    });
    return () => {
      isMountered = false;
    };
  }, [globalContext.language]);
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
    var showCategoryList = "";
    showCategoryList = categories.map((item) => {
      return (
        <div className="col-md-3" key={item.id}>
          <div className="card">
            <div className="card-body">
              {item?.children_categories.map((sub_category) => {
                return (
                  <>
                    <span className="text-white">
                      <Link
                        className="nav-link"
                        to={`/collections/${
                          sub_category.category_descriptions.find((x) => {
                            return x.language.name === globalContext.language;
                          }).category_id
                        }/${
                          sub_category.category_descriptions.find((x) => {
                            return x.language.name === globalContext.language;
                          }).id
                        }`}
                      >
                        <h5 className="text-dark">
                          {" "}
                          {
                            sub_category.category_descriptions.find((x) => {
                              return x.language.name === globalContext.language;
                            }).title
                          }
                        </h5>
                      </Link>
                    </span>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="py-3 bg-warning">
      <div className="container">
        <div className="row">
          <h6>Category Page</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">{showCategoryList}</div>
        </div>
      </div>
    </div>
  );
}
export default ViewCategory;
