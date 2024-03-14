import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";

export const Home = () => {
  const { t, i18n } = useTranslation("home");

  let link = "/cv/cv-sami-en.pdf";
  let download = "cv-sami-härkönen-en.pdf";
  if (i18n.language === "fi") {
    link = "/cv/cv-sami-fi.pdf";
    download = "cv-sami-härkönen-fi.pdf";
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sami Härkönen</h1>
      <h2 className={styles.sub_title}>{`${t("education")} & ${t("work")}`}</h2>
      <p className={styles.text}>{t("shortIntro")}</p>
      <p className={styles.intro}>{t("intro")}</p>
      <div className={styles.button_container}>
        <a className={styles.button} href={link} download={download}>
          {t("resume")}
        </a>
      </div>
    </div>
  );
};
