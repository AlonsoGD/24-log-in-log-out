import React from "react";

import styles from "./styles/LoadingSpinner.module.css";

const LoadingSpinner = ({ size }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={styles.LoadingSpinner}
    ></div>
  );
};

export default LoadingSpinner;
