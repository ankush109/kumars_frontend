import React, { Fragment, useState } from "react";
import "./header.css";
import { SpeedDial, SpeedDialAction } from "@mui/lab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/useraction";
import { Backdrop } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import Cookies from 'js-cookie';
const Useroptions = ({ user }) => {
  const [open, setopen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartitems } = useSelector((state) => state.cart);
  const options = [
    { icon: <ListAltIcon />, name: "orders", func: orders },
    { icon: <PersonIcon />, name: "profile", func: account },
    {
      icon: (
        <ShoppingCart
          style={{ color: cartitems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartitems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "logout", func: logoutuser },
    { icon: <HomeIcon />, name: "home", func: home },
  ];
  if (user.role !== "user") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function home() {
    navigate("/");
  }
  function logoutuser() {
    localStorage.removeItem('token');
    dispatch(logout());
    alert.success("logout successfully");
  }

  return (
    <div>
      <Fragment>
        <Backdrop open={open} style={{ zIndex: "10" }} />
        <SpeedDial
          ariaLabel="speeddial toolkit example"
          onClose={() => setopen(false)}
          onOpen={() => setopen(true)}
          open={open}
          style={{ zIndex: "11" }}
          direction="down"
          className="speedDial"
          icon={
            <img
              className="speedDialIcon"
              src="https://i.pinimg.com/236x/9d/54/1d/9d541d4f2fe368c67e2a49a23076e59f.jpg"
              alt="profile"
            />
          }
        >
          {options.map((item) => (
            <SpeedDialAction
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          ))}
        </SpeedDial>
      </Fragment>
    </div>
  );
};

export default Useroptions;
