import React, { Fragment, useRef, useState, useEffect } from "react";
import "../users/login.css";
import Loader from "../layout/Loader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { clearerrors, login, register } from "../../actions/useraction";
import { useAlert } from "react-alert";
import HttpsIcon from "@mui/icons-material/Https";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useNavigate } from "react-router-dom";
import Login1 from "../Login1";
import { Button, TextField } from "@mui/material";
const Register = (location) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setavatar] = useState();
  const [avatarPreview, setavatarpreview] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
  
    dispatch(login(loginEmail, loginPassword));
  };

  const [stateAuth, setStateAuth] = useState();
  const response = (res) => {
    setStateAuth(res);
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    
      setuser({ ...user, [e.target.name]: e.target.value });
    
  };
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

 

  return (
    <div className="main">
      <div className="img">
        <img src="https://wallpaperaccess.com/full/2593043.jpg" />
      </div>
      <form className="login" onSubmit={registerSubmit}>
        <div className="header1">
          <h1>KOMARS</h1>
        </div>
        <div className="header2">
          <h2>Welcome to Komars</h2>
        </div>
        <div className="login-container">
          <div>
            <TextField
            value={name}
            name="name"
            required
                onChange={registerDataChange}
              id="standard-basic"
              style={{
                width: "230px",
              }}
              label="name"
              variant="standard"
            />
          </div>
          <div>
            <TextField
            name="email"
            value={email}
            required
            onChange={registerDataChange}
              style={{
                width: "230px",
              }}
              id="standard-basic"
              label="Email"
              variant="standard"
            />
          </div>
          <div>
            <TextField
            name="password"
              required
            onChange={registerDataChange}
        value={password}
              style={{
                width: "230px",
              }}
              id="standard-basic"
              label="Password"
              variant="standard"
            />
          </div>
        </div>
        <div className="btn">
        <Button style={{
                width: "230px",
                borderRadius: "120px",
        }}type="submit" variant="contained">Register</Button>
        </div>
        <Link to="/login" style={{
      textDecoration: 'none',
      color: 'gray',
     }}>
     <p className="h">Dont have an account ? Login</p></Link>
      </form>
    </div>
  );
};

export default Register;
