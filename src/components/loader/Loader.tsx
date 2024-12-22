import React from "react";
import { Spinner } from "../spinner/Spinner";
import { Animation } from "../animation/Animation";
import styles from "./Loader.module.css";

type Props = {
    size: "small" | "medium" | "large";
};

export const Loader = ({ size }: Props) => (
  <div className={styles.container}>
    <Animation
      type={"zigzag"}
      numVertices={30}
      width={window.innerWidth}
      height={window.innerHeight}
    />
    <Spinner size={size} />
  </div>
);