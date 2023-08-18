import React, { Fragment,  useState, useEffect } from 'react'
import "./updateprofile.css"


import { useDispatch, useSelector } from "react-redux"
import {loaduser, updateprofile,clearerrors} from "../actions/useraction"
import { useAlert } from "react-alert"
import {useNavigate} from "react-router-dom"
import { UPDATEUSER_RESET } from '../constants/userconstant'
import Loader from './layout/Loader'


const Updateprofile = () => {
    
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate =useNavigate()
  const {user} = useSelector(state => state.user)
  const {error,isupdated,loading} = useSelector((state)=>state.profile)


const [name,setname] =useState("")
const [email,setemail] =useState("")
  const [avatar, setavatar] = useState()
  const [avatarPreview, setavatarpreview] = useState("")
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
 
    myForm.set("avatar", avatar);
    dispatch(updateprofile(myForm))

  };
  const updateProfileDataChange = (e) => {
  
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatar(reader.result)
          setavatarpreview(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    
  }
  useEffect(() => {
      if(user){
          setname(user.name)
          setemail(user.email)
         
      }
    if (error) {
      alert.error(error)
      dispatch(clearerrors())
    }
    if(isupdated){
        alert.success("profile updated successfully")
      dispatch(loaduser())
      navigate("/account")
      dispatch({
          type:UPDATEUSER_RESET
      })
    }
  }, [dispatch, error, alert,navigate,user,isupdated])



  return (
  <Fragment>
    {loading ? <Loader/> :(
      
    <Fragment>
 
    <div className="updateProfileContainer">
      <div className="updateProfileBox">
        <h2 className="updateProfileHeading">Update Profile</h2>

        <form
          className="updateProfileForm"
          encType="multipart/form-data"
          onSubmit={updateProfileSubmit}
        >
          <div className="updateProfileName">

            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="updateProfileEmail">
        
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

         
          <input
            type="submit"
            value="Update"
            className="updateProfileBtn"
          />
        </form>
      </div>
    </div>
  </Fragment>
    )}
  </Fragment>
  )
}
 
export default Updateprofile