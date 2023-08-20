import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import MenuIcon from '@mui/icons-material/Menu';
import Search from "./Search";
import { useSelector } from "react-redux";
function Header() {
  const [click, setClick] = useState(false);
const {user,isauthenticated}=useSelector((state)=>state.user)
  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
         <Link to="/" className="nav-logo">
         <h1  style={{
            textDecoration: "none",
            paddingLeft:"50px",
          }}exact to="/" className="nav-logo">
           KOMARS
            <i className="fas fa-code"></i>
          </h1>
          </Link>
          <div className="p">
            {
              isauthenticated ? <p style={{
                textDecoration: "none",
                color:"white",
                fontSize:"20px",
                fontWeight:"semi-bold",
                paddingTop:"10px",
                paddingRight:"120px"

              }}>hello , {user?.name}</p> : (
                <div>
               <Link to="/login" >

 <h3  style={{
                textDecoration: "none",
                color:"white",
                fontSize:"20px",
                fontWeight:"semi-bold",
                paddingTop:"10px",
                paddingRight:"120px"

              }}>
                 Login
                </h3>
  </Link>
                  </div>
              )
            }
          </div>
<Search />
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
