import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../productlist.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";

import {
  deleteeorder,
  getallorders,
  clearerrors,
} from "../../actions/orderaction";
import { DELETE_ORDER_RESET } from "../../constants/orderconstant";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";

const Orderlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allorders);

  const { error: deleteError, isdeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteeorder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearerrors());
    }

    if (isdeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getallorders());
  }, [dispatch, alert, error, deleteError, isdeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 70,
      flex: 0.5,
    },
    {
      field: "phonenumber",
      headerName: "Phone number",

      minWidth: 70,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderitems.length,
        amount: item.totalprice,
        status: item.orderstatus,
        phonenumber: item.shippinginfo.phonenumber,
      });
    });

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          <h4>Editing the orderstatus will come soon !</h4>

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
  );
};

export default Orderlist;
