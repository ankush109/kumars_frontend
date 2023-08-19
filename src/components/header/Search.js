import React, { useState, Fragment } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { Input } from "@mui/material";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const inputStyle = {
    width: "10vmax",
    height: "40px",
    padding: "10px",
    margin: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    background: "#fff",
    color: "#000",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s ease",
  };

  const buttonStyle = {
    padding: "10px 20px",
    background: "#007bff",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    transition: "background 0.3s ease",
  };

  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <button type="submit" style={{
          display:"none"
        }} > </button>
        <input
          style={inputStyle}
          type="text"
          placeholder="Search a Product"
          onChange={(e) => setKeyword(e.target.value)}
        />
      
      <SearchIcon 
      onClick={() => {
        // Programmatically trigger the submit button click
        document.querySelector('.searchBox button[type="submit"]').click();
      }}
      style={{color:"white"}}/>
   
      </form>
    </Fragment>
  );
};

export default Search;
