import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Caraousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearerrors,
  getproductdetails,
  newreview,
} from "../../actions/productaction";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import Loader from "../layout/Loader";
import "./productdetails.css";
import Reviewcard from "./Reviewcard";
import { useAlert } from "react-alert";

import { additemstocart } from "../../actions/cartaction";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";

const Productdetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productdetail
  );
  const { success, error: reviewerror } = useSelector(
    (state) => state.newreview
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerrors());
    }
    if (reviewerror) {
      alert.error(reviewerror);
      dispatch(clearerrors());
    }
    if (success) {
      alert.success("review submitted successfully");
    }

    dispatch(getproductdetails(id));
    console.log({ id });
  }, [dispatch, id, error, alert, success, reviewerror]);
  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const [quantity, setquantity] = useState(1);
  const [open, setopen] = useState(false);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");
  const increasequantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setquantity(qty);
  };
  const decreasequantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setquantity(qty);
  };
  const addtocart = () => {
    dispatch(additemstocart(id, quantity));
    alert.success("items added to the cart");
  };
  const submitreview = () => {
    open ? setopen(false) : setopen(true);
  };
  const reviewsubmithandler = async () => {
    const myform = new FormData();
    myform.set("rating", rating);
    myform.set("comment", comment);
    myform.set("productid", id);
    await dispatch(newreview(myform));
    await dispatch(getproductdetails(id));

    setopen(false);
    alert.success("your review has been submitted successfully");
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div className="d">
              <Caraousel>
                {product?.images &&
                  product?.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item?.url}
                      alt={`${i} slide`}
                    />
                  ))}
              </Caraousel>
            </div>

            <div className="foop">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
                <div className="detailsBlock-4">
                  <p>{product.description}</p>
                </div>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numberofreviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreasequantity}>-</button>
                    <input style={{
                      width: "50px",
                      height: "30px",
                      textAlign: "left",
                      border: "none",
                      outline: "none",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }} readOnly type="number" value={quantity} />
                    <button onClick={increasequantity}>+</button>
                  </div>
                  {"  "}
                  <button onClick={addtocart}>Add to Cart</button>
                </div>

                <p>
                  Status:{""}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <button onClick={submitreview} className="submitReview">
                {" "}
                submit Review
              </button>
            </div>
          </div>
          <h1 className="reviewsHeading">reviews</h1>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitreview}
          >
            <DialogTitle>Submit review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setrating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogueTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitreview} color="secondary">
                cancel
              </Button>
              <Button onClick={reviewsubmithandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <Reviewcard review={review} />)}
            </div>
          ) : (
            <p className="noReviews"> No reviews yet</p>
          )}
          <div></div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Productdetails;
