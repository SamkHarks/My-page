import React from "react";
import me from "../../../images/varialheel.jpeg";
import { useTranslation } from "react-i18next";
import styles from "./About.module.css";
import { Animation } from "../../animation/Animation";

export const About = () => {
  const { t } = useTranslation("about");
  return (
    <div className={styles.container}>
      <div className={styles.canvas}>
        <Animation
          type={"circle"}
          allowWierdMode={true}
          numVertices={100}
          width={150}
          height={150}
        />
      </div>
      <img className={styles.profile_image} src={me} alt="picture of me" />
      <p className={styles.text}>{t("introduction")}</p>
      <p className={`${styles.text} ${styles.margin_top}`}>{t("main")}</p>
      <p className={`${styles.text} ${styles.margin_top}`}>{t("end")}</p>
    </div>
  );
};
