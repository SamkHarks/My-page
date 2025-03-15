import { useTranslation } from "react-i18next";
import * as styles from "src/components/sections/home/Home.module.css";
import { getCVUrlFromLanguage } from "src/components/sections/home/utils";
import { getImageUrl } from "src/utils/utils";

export const Home = (): React.JSX.Element => {
  const { t, i18n } = useTranslation("home");
  const link = getCVUrlFromLanguage(i18n.language);
  const imageUrl = getImageUrl("Sami.jpeg");
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sami Härkönen</h1>
      <h2 className={styles.sub_title}>{`${t("education")} & ${t("work")}`}</h2>
      <p className={styles.text}>{t("shortIntro")}</p>
      <span className={styles.divider} />
      <div>
        <p className={styles.intro}>
          <img className={styles.sk8_image} src={imageUrl} alt={"picture of me"} />
          {t("intro")}
        </p>
        <div className={styles.button_container}>
          <a className={styles.button}
            href={link}
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            {t("resume")}
          </a>
        </div>
      </div>
    </div>
  );
};
