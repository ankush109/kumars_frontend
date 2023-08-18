import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SHIPPING_INFO,
} from "../constants/cartconstant";
import axios from "axios";
import { AuthAPI } from "./auth";
//login
export const additemstocart = (id, quantity) => async (dispatch, getstate) => {
  console.log(id, quantity);
  const { data } =await AuthAPI().get(`https://kubackend.onrender.com/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      images: data.product.images[0],
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartitems", JSON.stringify(getstate().cart.cartitems));
};
export const removefromcart = (id) => async (dispatch, getstate) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartitems", JSON.stringify(getstate().cart.cartitems));
};
//save shipping info

export const saveshippinginfo = (data) => async (dispatch) => {
  dispatch({
    type: SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippinginfo", JSON.stringify(data));
};
