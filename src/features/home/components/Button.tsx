import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { GoLinkExternal } from "react-icons/go";
import * as styles from "src/features/home/components/Button.module.css";
import { usePreloadModalContent } from "src/common/hooks/usePreloadModalContent";
import { OpenModalConfig } from "src/stores/useModalStore";
import { getAssetUrl } from "src/common/api/http/clients";
import { getConfiguration } from "src/config/utils";

const Content = lazy(() => import("src/common/components/documentViewer/DocumentViewer"));

export const Button = (): React.JSX.Element => {
  const handlePress = usePreloadModalContent();
  const { t, i18n } = useTranslation("home");
  const { paths } = getConfiguration();
  const link = getAssetUrl(i18n.language === "fi" ? paths.cv.fi : paths.cv.en);
  const onClick = () => {
    window.open(link, "_blank");
  };

  const modalConfig: OpenModalConfig = {
    content: <Content src={link} />,
      title: t("resume"),
      IconButton: GoLinkExternal,
      iconButtonProps: {
        size: 20,
        onClick,
      }
  };

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