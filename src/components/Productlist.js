import React, { Fragment, useEffect } from "react";
import { DataGrid, useNativeEventListener } from "@material-ui/data-grid";

import { useSelector, useDispatch } from "react-redux";
import {useAlert} from "react-alert"
import "./productlist.css"
import Sidebar from './Admin/Sidebar'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import { Button } from "@material-ui/core";
import { getallproductsadmin,deleteproduct } from "../actions/productaction";
import { Delete } from "@mui/icons-material";
import { DELETE_PRODUCT_RESET } from "../constants/productconstant";
const Productlist = () => {
  const dispatch = useDispatch();
const navigate =useNavigate()
  const alert = useAlert();

  const { error, products } = useSelector((state) => state.product);
  const {error:deleterror,isdeleted} =useSelector((state)=>state.delete)
  const deleteproductop =(id)=>{
dispatch(deleteproduct(id))
  }
  useEffect(()=>{
    if(isdeleted){
      alert.success("product deleted successfully")
    
      dispatch({type:DELETE_PRODUCT_RESET})
    }
    if(error){
     
      navigate("/home")
    }
      dispatch(getallproductsadmin())
    },[dispatch,error,alert,isdeleted]
  )

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            

            <Button
             onClick={()=>deleteproductop(params.getValue(params.id,"id"))}
            >
              <Delete/>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>


      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
        

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}


export default Productlist