import React from "react";
import ReactStars from "react-rating-stars-component";
import "./productdetails.css";
const Reviewcard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };
  return (
    <div className="reviewCard">
      <img
        src="https://i.pinimg.com/236x/9d/54/1d/9d541d4f2fe368c67e2a49a23076e59f.jpg"
        alt="user"
      />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default Reviewcard;
