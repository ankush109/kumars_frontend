import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./product.css";
const Product = ({ product }) => {
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
    <div onClick={()=>{
      window.location.href=`/product/${product._id}`
    }} className="container">
      <div className="product">
        <div className="c">
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <div className="de">
          <p>{product.name}</p>
          <span>{`₹ ${product.price}`}</span>

          <div>
            <ReactStars {...options} /> <span>({product.numberofreviews})</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;
