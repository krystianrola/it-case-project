import React from "react";
import styles from "./loadingIndicator.module.css";

export const LoadingIndicator = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCircle}></div>
    </div>
  );
};
