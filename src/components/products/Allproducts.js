import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearerrors,
  getproduct,
  getallproducts,
} from "../../actions/productaction";
import Loader from "../layout/Loader";
import Product from "./Product";
import "./allproducts.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

import { h1, Slider } from "@material-ui/core";
import FProduct from "./Featured";
const Allproducts = () => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [price, setPrice] = useState([0, 2000000]);
  const [ratings, setRatings] = useState(0);
  // convert it to string
  const [currenentpage, setcurrentpage] = useState(1);
  const { products, loading, error, resultperpage, productcount } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    console.log(typeof keyword);
    JSON.stringify(keyword);
    if (error) {
      alert.error(error);
      dispatch(clearerrors());
    }
    dispatch(getallproducts(keyword, currenentpage, price, category, ratings));
  }, [dispatch, keyword, currenentpage, category, ratings, alert, error]);
  const setcurrentpagenumber = (pagenumber) => {
    setcurrentpage(pagenumber);
  };
  const [debouncedPrice, setDebouncedPrice] = useState([0, 2000000]);

  // ... Other code ...
  const categories = [
    "Electronics",
    "Cameras",
    "phone",
    "Laptop",
    "Accessories",
    "Headphone",
  ];
  // Function to debounce the price changes
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedApiCall = debounce((newPrice) => {
    dispatch(getallproducts(keyword, currenentpage, newPrice));
  }, 3000); // Adjust the delay as needed

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
    setDebouncedPrice(newPrice); // Update debounced price

    // Call the debounced API function after dragging is finished
    debouncedApiCall(newPrice);
  };
  return (
    <>
      <div className="main">
        <div className="slider">
          <div className="filterBox">
            <h1>Price</h1>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={10000}
            />

            <h1>Categories</h1>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <h1>Ratings Above</h1>
            <Slider
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={5}
            />
          </div>
        </div>
        {loading ? (
          <div className="products">
            <Loader />
          </div>
        ) : (
          <div className="products">
            <h1 className="header">
              Products{" "}
              {category.length > 0 ? (
                <span className="cat">({category})</span>
              ) : (
                ""
              )}
            </h1>

            {products.length > 0 ? (
              products.map((prod) => {
                return <FProduct product={prod} />;
              })
            ) : (
              <h1>No Products Found</h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Allproducts;
