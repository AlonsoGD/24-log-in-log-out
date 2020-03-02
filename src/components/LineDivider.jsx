import React from "react";

const LineDivider = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1,
      border: "none",
      width: "90%",
      margin: "10px"
    }}
  />
);

export default LineDivider;
