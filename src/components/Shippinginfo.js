
import React, { Fragment, useState } from 'react'
import "./shippinginfo.css"
import { PinDrop } from '@mui/icons-material'
import { Home } from '@mui/icons-material'
import { LocationCity } from '@mui/icons-material'
import { Public } from '@mui/icons-material'
import {Country,State} from "country-state-city"
import { Phone } from '@mui/icons-material'
import { useSelector, useDispatch } from "react-redux";
import {useAlert} from "react-alert"
import CheckoutSteps from './Checkoutsteps'

import { saveshippinginfo } from '../actions/cartaction'
import { useNavigate } from 'react-router-dom'
const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate =useNavigate()
  const { shippinginfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user)
  const [address, setAddress] = useState(shippinginfo.address);
  const [city, setCity] = useState(shippinginfo.city);
  const [state, setState] = useState(shippinginfo.state);
  const [country, setCountry] = useState(shippinginfo.country);
  const [pinCode, setPinCode] = useState(shippinginfo.pinCode);
  const [phonenumber, setPhoneNo] = useState(shippinginfo.phoneNo);
const userinfo ={
  name:user?.name,
  email:user?.email,
  phonenumber:user?.phonenumber,
  role:user?.role
}
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phonenumber.length < 10 || phonenumber.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveshippinginfo({ address, city, state, country, pinCode, phonenumber,userinfo })
    );
    navigate("/orders/confirm")
 
  };

  return (
    <Fragment>


      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <Home />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDrop />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <Phone />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phonenumber}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <Public />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
           

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
























