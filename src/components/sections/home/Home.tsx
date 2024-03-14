import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";

export const Home = () => {
  const { t } = useTranslation("home");
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sami Härkönen</h1>
      <h2 className={styles.sub_title}>{`${t("education")} & ${t("work")}`}</h2>
      <p className={styles.text}>{t("shortIntro")}</p>
      <p className={styles.intro}>{t("intro")}</p>
      <div className={styles.button_container}>
        <button className={styles.button}>{t("resume")}</button>
      </div>
    </div>
  );
};
