import React, { Fragment, useEffect } from "react";
import "./orderdetails.css"
import { useSelector, useDispatch } from "react-redux";

import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {myorder,getorderdetails} from "../actions/orderaction"

import { useAlert } from "react-alert";

const OrderDetails = () => {

  const { loading, error, order } = useSelector((state) => state.orderdetails);

  const dispatch = useDispatch();
  const alert = useAlert();
const {id} =useParams()
  useEffect(() => {
  if(error){
    console.log(error);
    alert.error(error)
  }


dispatch(getorderdetails(id))
  }, [alert,dispatch, error,id]);
  return (
 
        <Fragment>
         
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
            <div>
            <h2>₹  {order && order.totalprice} is the Total Price you have to gpay the owner (Ignore if paid already!)</h2>
            </div>
             <h2> Order status : {order && order.orderstatus}</h2>
             <div>
              <h2>Tax Price :₹ {order && order.taxprice}</h2>
            </div>
            </div>
          
          </div>
        </Fragment>
  )
};

export default OrderDetails;