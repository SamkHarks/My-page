import { lazy, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GoLinkExternal } from "react-icons/go";
import * as styles from "src/features/home/Button.module.css";
import { useConfiguration, usePreloadModalContent } from "src/hooks/hooks";
import { OpenModalConfig } from "src/stores/useModalStore";
import { createUrl } from "src/utils/utils";

const Content = lazy(() => import("src/components/documentViewer/DocumentViewer"));

export const Button = (): React.JSX.Element => {
  const handlePress = usePreloadModalContent();
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
    handlePress(modalConfig);
  }

  return (
    <div className={styles.button_container}>
      <button
        className={styles.button}
        onClick={onPress}
      >
        {t("resumeLong")}
      </button>
    </div>
  )
}