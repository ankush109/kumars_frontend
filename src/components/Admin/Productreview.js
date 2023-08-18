import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./review.css";
import { useSelector, useDispatch } from "react-redux";
import {
 getallreviews,deletereviews,clearerrors,
} from "../../actions/productaction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";



import { useNavigate } from "react-router-dom";

import { DELETE_REVIEW_RESET } from "../../constants/productconstant";
import { Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { Star } from "@mui/icons-material";

const ProductReviews = () => {
  const dispatch = useDispatch();
const navigate =useNavigate()
  const alert = useAlert();

  const { error: deleteError, isdeleted } = useSelector(
    (state) => state.deletereview
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.reviewop
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deletereviews(reviewId, productId));
    console.log(productId);
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getallreviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getallreviews(productId));
    }
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
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isdeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
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
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
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

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      

      <div className="dashboard">
        <Sidebar/>
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            
            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <h4 >Give the Product Id to get reviews of that particular product item </h4>
            <br>
            </br>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;