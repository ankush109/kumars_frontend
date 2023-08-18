import React from "react";
import "./loader.css";
import { FadeLoader } from "react-spinners";
const Loader = () => {
  const override = {
    display: "block",
    margin: "20% auto",
    borderColor: "red",
  };
  const [loading, setLoading] = React.useState(true);
  return (
    <div>
      <FadeLoader
        color={"#008080"}
        loading={true}
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
