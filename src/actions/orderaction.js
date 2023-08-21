import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERRORS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDER_SUCCESS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../constants/orderconstant";

import axios from "axios";
import { AuthAPI } from "./auth";

//create order
export const createorder = (order) => async (dispatch, getstate) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const { data } =await AuthAPI().post("https://kumars-backend-2.onrender.com/api/v1/order/new", order);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//myorders
export const myorder = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await AuthAPI().get("https://kumars-backend-2.onrender.com/api/v1/orders/me");
    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//get order details
export const getorderdetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } =await AuthAPI().get(`https://kumars-backend-2.onrender.com/api/v1/order/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//get all orders //admin
export const getallorders = () => async (dispatch, getstate) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } =await AuthAPI().get("/admin/orders");
    console.log(data);
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateeorder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await AuthAPI().put(
      `https://kumars-backend-2.onrender.com/api/v1/admin/orders/${id}`,
      order,
      config
    );
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deleteeorder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await AuthAPI().delete(`https://kumars-backend-2.onrender.com/api/v1/admin/orders/${id}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//clearing errors:-
export const clearerrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
