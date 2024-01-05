import React from "react";
import Card from "../Card/Card";
import styles from "./Loader.module.css";

const Loader = ({ message }) => {
  return (
    <div className={styles.cardWrapper}>
      <Card>
      <span className={styles.loader}></span>
        <span className={styles.message}>{message}</span>
      </Card>
    </div>
  );
};

export default Loader;
