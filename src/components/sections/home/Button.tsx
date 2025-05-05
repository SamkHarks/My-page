import { lazy, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GoLinkExternal } from "react-icons/go";
import * as styles from "src/components/sections/home/Button.module.css";
import { Spinner } from "src/components/spinner/Spinner";
import { useConfiguration, usePreloadModalContent } from "src/hooks/hooks";
import { OpenModalConfig } from "src/stores/useModalStore";
import { createUrl } from "src/utils/utils";

const Content = Object.assign(
  lazy(() => import("src/components/documentViewer/DocumentViewer")),
  {
    preload: () => import("src/components/documentViewer/DocumentViewer"),
  }
);

export const Button = (): React.JSX.Element => {
  const {handlePress, isLoading} = usePreloadModalContent();
  const { t, i18n } = useTranslation("home");
  const {baseUrls, paths} = useConfiguration();
  const link = createUrl(i18n.language === "fi" ? paths.cv.fi : paths.cv.en, baseUrls.firebase);
  const onClick = useCallback(() => {
    window.open(link, "_blank");
  }
  , [link]);

  const modalConfig: OpenModalConfig = useMemo(() => ({
    content: <Content src={link} />,
      title: t("resume"),
      IconButton: GoLinkExternal,
      iconButtonProps: {
        size: 20,
        onClick,
      }
  })
  , [link, t, onClick]);

  const onPress = () => {
    handlePress(Content.preload, modalConfig);
  }

  return (
    <div className={styles.button_container}>
      <button
        className={styles.button}
        onClick={onPress}
      >
        {isLoading ? <Spinner size={16} /> : t("resume")}
      </button>
    </div>
  )
}