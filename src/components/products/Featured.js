import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./featured.css";
const FProduct = ({ product }) => {
  useEffect(() => {
    console.log(product);
  }, [product]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  const buttonStyles = {
    backgroundColor: "purple",
    color: "white",
    border: "none",
    borderRadius: "30px",
    padding: "10px 20px",

    fontSize: "16px",
  };
  return (
    <Link className="productcard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} className="" alt={product.name} />

      <p>
        {product.name} &nbsp; ({product.description.slice(0, 20).concat("...")})
      </p>
      <span>{`₹ ${product.price}`}</span>

      <div>
        <ReactStars {...options} />{" "}
        <span className="review">({product.numberofreviews})</span>
      </div>
    </Link>
  );
};

export default FProduct;
