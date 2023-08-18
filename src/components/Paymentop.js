import React, { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/layout/Loader";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./p.css";
import CheckoutSteps from "./Checkoutsteps";
function Paymentop() {
  const alert = useAlert();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cartitems = JSON.parse(localStorage.getItem("cartitems"));
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const getToken = async () => {
    try {
      const { data } = await axios.get("https://kubackend.onrender.com/api/v1/braintree/token");
      console.log(data);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [isAuthenticated]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      console.log(cartitems, "cart");
      await axios.post("https://kubackend.onrender.com/api/v1/braintree/payment", {
        nonce,
        cartitems,
      });
      setLoading(false);
      localStorage.removeItem("cartitems");

      navigate("/orders");
      alert.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
<div >
<CheckoutSteps activeStep={2} />
<div className="container">
      
      {!clientToken || !isAuthenticated || !cartitems?.length ? (
        <Loader />
      ) : (
        <>
          <DropIn
            options={{
              authorization: clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => setInstance(instance)}
          />

          <button
            className="btn btn-primary"
            onClick={handlePayment}
            disabled={loading || !instance}
          >
            {loading ? "Processing ...." : "Make Payment"}
          </button>
        </>
      )}
    </div>
</div>
  );
}

export default Paymentop;
