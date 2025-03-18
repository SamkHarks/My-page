import { lazy, useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as styles from "src/components/sections/home/Home.module.css";
import { getCVUrlFromLanguage } from "src/components/sections/home/utils";
import { useModalStore } from "src/stores/useModalStore";
import { getImageUrl } from "src/utils/utils";

const Content = lazy(() => import("src/components/cv/Cv"));
const GoLinkExternal = lazy(() => import("react-icons/go").then((module) => ({ default: module.GoLinkExternal })));

export const Home = (): React.JSX.Element => {
  const openModal = useModalStore((state) => state.openModal);
  const { t, i18n } = useTranslation("home");
  const link = getCVUrlFromLanguage(i18n.language);
  const imageUrl = getImageUrl("Sami.jpeg");

  const onClick = useCallback(() => {
    window.open(link, "_blank");
  }
  , [link]);

  const onPress = useCallback(() => {
    openModal({
      content: <Content link={link} />,
      title: t("resume"),
      IconButton: GoLinkExternal,
      iconButtonProps: {
        size: 20,
        onClick,
      }
    });
  }, [link, openModal, t, onClick]);

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
          <button
            className={styles.button}
            onClick={onPress}
          >
            {t("resume")}
          </button>
        </div>
      </div>
    </div>
  );
};
