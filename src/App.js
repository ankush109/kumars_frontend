import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";

import webfont from "webfontloader";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import "./App.css";
import Productdetails from "./components/products/Productdetails";
import Allproducts from "./components/products/Allproducts";
import Header from "./components/header/Header";
import Loginsignup from "./components/users/loginsignup";
import { loaduser } from "./actions/useraction";
import store from "./Store";
import Useroptions from "./components/header/Useroptions";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./components/Accounts";
import ProtectedRoute from "./components/routes/protectedroute";
import Updateprofile from "./components/Updateprofile";
import Cart from "./components/cart";
import Shippinginfo from "./components/Shippinginfo";
import Confirmorder from "./components/Confirmorder";
import axios from "axios";

import Paymentop from "./components/Paymentop";
import Myorders from "./components/Myorders";
import Dashboard from "./components/Admin/Dashboard";
import Productlist from "./components/Productlist";
import Newproduct from "./components/Admin/Newproduct";
import NewProduct from "./components/Admin/Newproduct";
import Updateproduct from "./components/Admin/Updateproduct";
import Orderlist from "./components/Admin/Orderlist";
import Processorder from "./components/Admin/Processorder";
import MyOrders from "./components/Myorders";
import OrderDetails from "./components/orderdetails";
import UsersList from "./components/Admin/Alluser";

import ProductReviews from "./components/Admin/Productreview";
import About from "./components/users/About";
import Payment from "./components/Paymentop";
import { LOADUSER_REQUEST, LOADUSER_SUCCESS } from "./constants/userconstant";
import Cookies from 'js-cookie';
import Register from "./components/users/Register";

function App() {
 
  const { isAuthenticated, user } = useSelector((state) => state.user);




  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
store.dispatch(loaduser())


  }, []);
  return (
    <div className="op44">
      <Router>
        <Header />

        {isAuthenticated && <Useroptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path="/products" element={<Allproducts />} />
          <Route path="/products/:keyword" element={<Allproducts />} />
          <Route path="/login" element={<Loginsignup />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/account" element={<ProtectedRoute />}>
            <Route exact path="/account" element={<Profile />} />
          </Route>
          <Route exact path="/me/update" element={<ProtectedRoute />}>
            <Route exact path="/me/update" element={<Updateprofile />} />
          </Route>
          <Route exact path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shippinginfo />} />
          <Route exact path="/orders/confirm" element={<ProtectedRoute />}>
            <Route exact path="/orders/confirm" element={<Confirmorder />} />
          </Route>
          <Route path="/process/payment" element={<ProtectedRoute />}>
            <Route path="/process/payment" element={<Payment />} />
          </Route>
          <Route path="/admin/dashboard" element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/products" element={<Productlist />} />
          <Route path="/admin/orders" element={<Orderlist />} />
          <Route path="/admin/order/:id" element={<Processorder />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/reviews" element={<ProductReviews />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
