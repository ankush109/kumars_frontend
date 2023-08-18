import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";




import { UPDATE_USER_RESET} from "../../constants/userconstant"
import {
getuserdetails,
updateuser,
clearerrors
} from "../../actions/useraction";

import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { MailOutline } from "@mui/icons-material";
import { VerifiedUser } from "@mui/icons-material";
import { Button } from "@material-ui/core";
import { Person } from "@mui/icons-material";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
const {id}=useParams()
  const { error, user } = useSelector((state) => state.userdetails);

  const {
    loading: updateLoading,
    error: updateError,
    isupdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = id
  const navigate =useNavigate()
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getuserdetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearerrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearerrors());
    }

    if (isupdated) {
      alert.success("User Updated Successfully");
   navigate("/admin/users")
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isupdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateuser(userId, myForm));
  };

  return (
    <Fragment>

      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
         
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>
              <h4>Note : This is not yet working , will fix soon!</h4>
              <div>
                <Person/>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUser />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;