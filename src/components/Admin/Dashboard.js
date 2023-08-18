import React ,{useEffect} from 'react'
import Sidebar from './Sidebar.js'

import { useSelector, useDispatch } from "react-redux";
import "./dashboard.css"
import {useAlert} from "react-alert"
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import {Doughnut,Line} from "react-chartjs-2"
import {getallorders} from "../../actions/orderaction"
import { getallproductsadmin } from '../../actions/productaction.js';
import {getallusers,clearerrors,deleteuser } from "../../actions/useraction";
const Dashboard = () => {

  const alert = useAlert();
  const dispatch =useDispatch()
  const { error, products } = useSelector((state) => state.product);
  const {  user } = useSelector((state) => state.allusers);
  const { orders} = useSelector((state) => state.allorders);
  let outofstock =0
  products && products.forEach((item)=>{
    if(item.stock===0){
      outofstock +=1;
    }
  })
  useEffect(()=>{
    if(error){
      alert.error(error)
      console.log(error);
    }
      dispatch(getallproductsadmin())
      dispatch(getallorders())
      dispatch(getallusers())
    },[dispatch,error,alert]
    
  )
  let totalamount = 0;
  orders && orders.forEach((item) => {
      totalamount = totalamount + item.totalprice;
      
    });
  
  return (
    <div className="dashboard">

    <Sidebar />

    <div className="dashboardContainer">
     
      <Typography component="h1">Welcome on Board Sir </Typography>
      <Typography component="h1">Dashboard</Typography>

      <div className="dashboardSummary">
        <div>
          <p>
             Total Buisness Revenue <br /> ₹ {totalamount}
          </p>
        </div>
        
        <div className="dashboardSummaryBox2">
          
          <Link to="/admin/products">
            <p>Product</p>
            <p>{products && products.length} </p>
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p>{orders && orders.length}</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p>{user && user.length}</p>
          </Link>
        </div>
        <div>
        <h3>Note :  Click on those circles to go to the individual sections</h3>
        </div>
        
      </div>
  

  
    </div>
  </div>
  )
}

export default Dashboard