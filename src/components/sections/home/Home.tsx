import { lazy, useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as styles from "src/components/sections/home/Home.module.css";
import { useModalStore } from "src/stores/useModalStore";
import { GoLinkExternal } from "react-icons/go";
import { useConfiguration } from "src/hooks/hooks";
import { createUrl } from "src/utils/utils";

const Content = Object.assign(
  lazy(() => import("src/components/documentViewer/DocumentViewer")),
  {
    preload: () => import("src/components/documentViewer/DocumentViewer"),
  }
);

export const Home = (): React.JSX.Element => {
  const openModal = useModalStore((state) => state.openModal);
  const { t, i18n } = useTranslation("home");
  const {baseUrls, paths} = useConfiguration();
  const link = createUrl(i18n.language === "fi" ? paths.cv.fi : paths.cv.en, baseUrls.firebase);
  const imageUrl = createUrl(paths.images.me, baseUrls.firebase);

  const onClick = useCallback(() => {
    window.open(link, "_blank");
  }
  , [link]);

  const handlePreload = useCallback(() => {
    Content.preload();
  }, []);

  const onPress = useCallback(() => {
    openModal({
      content: <Content src={link} />,
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
            onMouseEnter={handlePreload}
            onTouchStart={handlePreload}
          >
            {t("resume")}
          </button>
        </div>
      </div>
    </div>
  );
};
