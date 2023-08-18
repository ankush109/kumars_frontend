import {createStore,combineReducers,applyMiddleware} from "redux"

import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import { cartreducer } from "./reducers/cartreducer"
import { allorderreducer, myorderreducer, neworderreducer, orderdetailreducer, orderreducer } from "./reducers/orderreducer"
import { deletereducer, newproductreducer, newreviewreducer, reviewsreducer,deletereviews,productdetailreducer, productreducer } from "./reducers/productreducer"
import {allUsersReducer, profilereducer, userDetailsReducer, userreducer} from "./reducers/Userreducer"
const reducer =combineReducers({
product:productreducer,
productdetail:productdetailreducer,
user:userreducer,
profile:profilereducer,
cart:cartreducer,
neworder:neworderreducer,
myorder:myorderreducer,
newreview:newreviewreducer,
newproduct:newproductreducer,
delete:deletereducer,
allorders:allorderreducer,
order:orderreducer,
orderdetails:orderdetailreducer,
allusers:allUsersReducer,
userdetails:userDetailsReducer,
reviewop:reviewsreducer,
deletereview:deletereviews,

})
let initialstate ={
    cart:{
        cartitems : localStorage.getItem("cartitems")? JSON.parse(localStorage.getItem("cartitems")):[],
        shippinginfo:localStorage.getItem("shippinginfo")
        ?JSON.parse(localStorage.getItem("shippinginfo")):{}
    }
}
const middleware =[thunk]
const store =createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))
export default store