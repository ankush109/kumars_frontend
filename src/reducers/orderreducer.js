import {ALL_ORDERS_FAIL,ALL_ORDERS_REQUEST,ALL_ORDERS_SUCCESS,DELETE_ORDER_FAIL,DELETE_ORDER_REQUEST,DELETE_ORDER_RESET,DELETE_ORDER_SUCCESS, UPDATE_ORDER_REQUEST,UPDATE_ORDER_FAIL,UPDATE_ORDER_RESET,UPDATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,MY_ORDERS_FAIL,MY_ORDERS_REQUEST,MY_ORDER_SUCCESS, CREATE_ORDER_REQUEST, CLEAR_ERRORS, CREATE_ORDER_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from "../constants/orderconstant";
export const neworderreducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,

            }
        default:
            return state
    }



}
export const myorderreducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
       
                loading: true,

            }
        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,

            }
        default:
            return state
    }


}

export const orderdetailreducer = (state = {order:{}}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
       
                loading: true,

            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: true,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,

            }
        default:
            return state
    }


}
export const allorderreducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return {
       
                loading: true,

            }
        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,

            }
        default:
            return state
    }


}
export const orderreducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
            case DELETE_ORDER_REQUEST:
            return {
                    ...state,
                loading: true,

            }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isupdated: action.payload
            }
            case DELETE_ORDER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isdeleted: action.payload
                }
        case UPDATE_ORDER_FAIL:
            case DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            case UPDATE_ORDER_RESET:
                return {
                   ...state,
                    isupdated:false
                }
                case DELETE_ORDER_RESET:
                    return {
                       ...state,
                        isdeleted:false
                    }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,

            }
        default:
            return state
    }


}
