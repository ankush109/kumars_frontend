import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myorder.css";
import { useSelector, useDispatch } from "react-redux";
import { myorder, clearerrors } from "../actions/orderaction";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Launch } from "@mui/icons-material";
import { Typography } from "@material-ui/core";
import Header from "./header/Header";
import "./p.css";
import Loader from "./layout/Loader";
const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myorder);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 1 },

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
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
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
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      console.log(item);
    });
  useEffect(() => {
    if (error) {
      alert.error("You need to register to order");
      dispatch(clearerrors());
      navigate("/");
    }

    dispatch(myorder());
  }, [dispatch, alert, error]);

  return (
    <div>
      {loading ? ( // Render a loading indicator while fetching data
        <Loader />
      ) : orders && orders.length > 0 ? (
        <>
          <div className="page">
            <h1 className="text-center">Your  Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).format("DD/MM/YYYY")}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="my-orders-container">
                    {o?.products?.map((p, i) => (
                      <div className="order-details" key={p._id}>
                        <div className="imgr">
                          <img
                            src={p.images}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          {/* <p>{p.description.substring(0, 30)}</p> */}
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="container">
          <h3>No orders</h3>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
