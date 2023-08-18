import {ADD_TO_CART,REMOVE_CART_ITEM, SHIPPING_INFO} from "../constants/cartconstant"

export const cartreducer = (state = {cartitems:[] ,shippinginfo:{} },action) =>{

switch(action.type){
    case ADD_TO_CART:
        const items =action.payload;
        const isitemsexist = state.cartitems.find(
            (i)=>i.product === items.product
        )
        if(isitemsexist){
            return{
                ...state,
                cartitems:state.cartitems.map((i)=>
                    i.product ===isitemsexist.product ? items :i
                )
            }
        }else{
            return{
                ...state,
                cartitems:[...state.cartitems,items]
            }
        }
        case REMOVE_CART_ITEM :
            return {
                ...state,
                cartitems:state.cartitems.filter((i)=>i.product!==action.payload)
            }
            case SHIPPING_INFO:
                return {
                    ...state,
                    shippinginfo:action.payload
                }
        default :
        return state
}

}