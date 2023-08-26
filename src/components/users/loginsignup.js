import React, { Fragment, useRef, useState, useEffect } from "react";
import "../users/login.css";
import Loader from "../layout/Loader";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { clearerrors, login, register } from "../../actions/useraction";
import { useAlert } from "react-alert";
import HttpsIcon from "@mui/icons-material/Https";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useNavigate } from "react-router-dom";
import Login1 from "../Login1";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Button, TextField } from "@mui/material";
const LoginSignUp = (location) => {
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
  const [inputstatus, setinputstatus] = useState("password");
  const { name, email, password } = user;
  const [avatar, setavatar] = useState();
  const [avatarPreview, setavatarpreview] = useState("");
const [loading1, setLoading1] = useState(false);
  const loginSubmit = (e) => {
    e.preventDefault();
    setLoading1(true)
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
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatar(reader.result);
          setavatarpreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setuser({ ...user, [e.target.name]: e.target.value });
    }
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

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <div className="main">
      <div className="img">
        <img src="https://wallpaperaccess.com/full/2593043.jpg" />
      </div>
      <form className="login" onSubmit={loginSubmit}>
        <div className="header1">
          <h1>KUMARS</h1>
        </div>
        <div className="header2">
          <h2>Welcome to KUMARS</h2>
        </div>
        <div className="login-container">
       <div className="op">
       <div>
            <TextField
              required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
              id="standard-basic"
              style={{
                width: "280px",
                
              }}
              label="Email"
              variant="standard"
            />
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
          }}>
            <TextField
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
              style={{
                width: "280px",
                marginTop: "20px",
              }}
              id="standard-basic"
              label="Password"
              type={inputstatus}
              variant="standard"
            />
            {
              inputstatus === "password" ? <VisibilityOffIcon  onClick={()=>{
                if(inputstatus === "password"){
                  setinputstatus("text")
                }else{
                  setinputstatus("password")
                }
              }
              }/> : <RemoveRedEyeIcon onClick={()=>{  
                if(inputstatus === "password"){
                  setinputstatus("text")
                }else{
                  setinputstatus("password")
                }
              }} />
            }
          
              
          </div>
       </div>
        </div>
        {/* {
      !stateAuth ? <Login1 response={response} /> : navigate('/')
     } */}
        <div className="btn">
        <Button disabled={
          loading1 ? true : false
        } style={{
                width: "230px",
                borderRadius: "120px",
        }}type="submit" variant="contained">Login</Button>
        </div>
        <div>
     <Link to="/register" style={{
      textDecoration: 'none',
      color: 'gray',
     }}>
     <p className="h">Dont have an account ? Register</p></Link>
      </div>
     
      </form>
   
    </div>
  );
};

export default LoginSignUp;
