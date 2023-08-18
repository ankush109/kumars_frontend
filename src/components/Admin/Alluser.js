import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../productlist.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar";
import {getallusers,clearerrors,deleteuser } from "../../actions/useraction";
import { DELETE_USER_RESET } from "../../constants/userconstant"
import { Edit } from "@mui/icons-material";
import { Button } from "@material-ui/core";
import { Delete } from "@mui/icons-material";
const UsersList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
const navigate =useNavigate()
  const { error, user } = useSelector((state) => state.allusers);

  const {
    error: deleteError,
    isdeleted
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteuser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearerrors());
      console.log(deleteError);
    }

    if (isdeleted) {
      alert.success("user deleted successfully");
      navigate("/admin/users")
      
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getallusers());
  }, [dispatch, alert, error, deleteError, navigate, isdeleted]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  user &&
    user.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
  

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
        

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

export default UsersList;