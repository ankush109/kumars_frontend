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

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
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
          <div className="banner">
            {/* <p>Celebrate every moment,</p> */}
            <p></p>
          
<img src="https://www.apple.com/v/iphone-14-pro/e/images/meta/iphone-14-pro_overview__3dn6st99cpea_og.png"/>
            <p></p>
          </div>
          <div className="s">
          <img style={
  {
    width:"320px",
    height:"270px"
  }
}src="https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU="/>
          <img style={
  {
    width:"320px",
    height:"300px",
    paddingLeft:"20px"
  }
}src="https://cdn.moglix.com/p/SqFavtX0YGNqv.jpg"/>
          <img style={
  {
    width:"320px",
    height:"270px",
    paddingLeft:"20px"
  }
}src="https://m.media-amazon.com/images/I/616u5TNnUWL._AC_UY1100_.jpg"/>
          <img style={
  {
    width:"300px",
    height:"270px",
    paddingLeft:"20px"
  }
}src="https://i.gadgets360cdn.com/products/large/redmi-note-12-5g-pro-plus-db-gadgets360-800x600-1673019783.jpg"/>

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
    </Fragment>
  );
};

export default Home;
