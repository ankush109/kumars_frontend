import axios from "axios";

export const AuthAPI = () => {
    if (typeof window === "undefined") {
      return axios.create({
        baseURL: `https://kubackend.onrender.com`,
        headers: { authorization: `${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      });
    } else {
      return axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
        headers: { authorization: `Bearer }`, "Content-Type": "application/json" },
      });
    }
  };
  