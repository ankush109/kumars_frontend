import React from "react";
import { Fragment } from "react";
import Product from "../products/Product";
import "./home.css";

import Metadata from "../layout/Metadata";
import { clearerrors, getproduct } from "../../actions/productaction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import FProduct from "../products/Featured";
import Header from "../header/Header";
import Footer from "../footer/footer";
import { Link } from "react-router-dom";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated,user  } = useSelector((state) => state.user);
  const { loading, error, products, productscount } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerrors);
    }
    dispatch(getproduct());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
         <div className="opo"  style={{ visibility: isAuthenticated ? "hidden" : "visible" }}>
          {
            !isAuthenticated ? (
              <div>
                <Link style={{
                  color:"white",
                  textDecoration:"none",
                  fontSize:"20px",
                  fontWeight:"bold",

                }} to="/login" >
              <p className="blinking-text">Login/Register</p>
                </Link>
                </div>
            ) :""
          }
          </div>
          <h2 className="homeheading"> Featured Products</h2>
          <div className="w">
            {products &&
              products
                .slice(0, 7)
                .map((product) => <FProduct product={product} />)}
          </div>
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};

export default Home;
