import React from "react";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sami Härkönen</h1>
      <h2 className={styles.sub_title}>Developer at Veikkaus</h2>
      <p className={styles.text}>
        Passionate About Problem Solving and Building High-Performance
        Applications for Mobile and Web.
      </p>
    </div>
  );
};
