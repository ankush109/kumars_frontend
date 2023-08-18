import React, { useEffect } from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const CartItemCard = ({ item, deletecartitem }) => {
  useEffect(() => {
    console.log(item);
  });
  return (
    <div className="CartItemCard">
      <img src={item.images.url} alt="product" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
      
        <Button style={{
          backgroundColor: "#f73471",
          color: "white",
          margin: "5px",
        
          
        }} variant="contained" onClick={() => deletecartitem(item.product)}>Remove</Button>
      </div>
    </div>
  );
};

export default CartItemCard;
