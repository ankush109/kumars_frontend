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



  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <button type="submit" style={{
          display:"none"
        }} > </button>
        <input
          className="searchInput"
          type="text"
          value={keyword}
          placeholder="Search a Product"
          onChange={(e) => setKeyword(e.target.value)}
        />
      <SearchIcon onClick={()=>{
        if (keyword.trim()) {
          navigate(`/products/${keyword}`);
        } else {
          navigate("/products");
        }
      }} style={{
        fontSize:"30px",
        backgroundColor:"white",
        borderRadius:"50%",
        padding:"5px",
        marginLeft:"-40px",
      }} color={
        keyword.trim() ? "primary" : "disabled"
      }/>
      </form>
    </Fragment>
  );
};

export default Search;
