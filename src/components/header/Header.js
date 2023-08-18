import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { useSelector } from "react-redux";
import Search from "./Search";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Header = () => {
  const { cartitems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <div class="topnav">
      <Link
        to="/"
        style={{
          color: "white",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        KOMARS
      </Link>
      {/* {
     isAuthenticated ? (
    <span> Welcome   {user.name}</span>
     ) :(
      <Link to="/login">Login</Link>
     )
   } */}
     <div className="dd">
     <div className="h">
        {isAuthenticated && user.role === "admin" && (
          <Link to="/admin/dashboard">Dashboard</Link>
        )}
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/cart">
          <ShoppingCartIcon style={{color:"white"}}/>
          ({cartitems.length})</Link>
      </div>
      <div className="search">
        <Search />
      </div>
     </div>
      {isAuthenticated ? <>{
    <h1 style={
      {
        color:"white",
        fontSize:"20px",
        fontWeight:"bold",
        paddingLeft:"20px",
        paddingTop:"10px"
       }
    }> Hello, {user.name}
      </h1>
      }</> : <Link to="/login">Login</Link>}
    </div>
  );
};

export default Header;
