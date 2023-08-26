import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import MenuIcon from '@mui/icons-material/Menu';
import Search from "./Search";
import { useSelector } from "react-redux";
import favicon from "./favicon.png"
function Header() {
  const [click, setClick] = useState(false);
const {user,isAuthenticated}=useSelector((state)=>state.user)
  const handleClick = () => {
    setClick(!click);
    console.log(isAuthenticated,'auth')
  }
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
         <Link to="/" className="nav-logo">
         <div>
         <img src={favicon} style={
            {
              width:"50px",
              height:"50px",
              borderRadius:"50%",
       

            }
          } />
         </div>
    <div>
    <h1  style={{
            textDecoration: "none",
          
          }}exact to="/" className="nav-logo">
          Kumars
            <i className="fas fa-code"></i>
          </h1>
    </div>
          </Link>
          <div className="p">
            {
              isAuthenticated ? (
                <p>hello , {user?.name}</p>
              ) : (
                <div>
               <Link style={{
                textDecoration: "none",
               }} to="/login" >

 <h3  style={{
                textDecoration: "none",
                color:"white",
                fontSize:"20px",
                fontWeight:"semi-bold",
                paddingTop:"10px",
                paddingRight:"120px"

              }}>
                Please  Login
                </h3>
  </Link>
                  </div>
              )
            }
          </div>
<div className="search">
<Search />
</div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink

                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/products"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/cart"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                My Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/orders"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
               My Orders
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}> 
            <MenuIcon />
            </i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
