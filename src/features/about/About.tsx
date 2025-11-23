import { useTranslation } from "react-i18next";
import * as styles from "src/features/about/About.module.css";
import { Animation } from "src/common/components/animation/Animation";
import { getAssetUrl } from "src/common/api/http/clients";
import { getConfiguration } from "src/config/utils";

export const About = (): React.JSX.Element => {
  const { paths } = getConfiguration();
  const imageUrl = getAssetUrl(paths.images.skate);
  const { t } = useTranslation("about");
  return (
    <div className={styles.container}>
      <div className={styles.canvas}>
        <Animation
          type={"circle"}
          numVertices={100}
          width={150}
          height={150}
          allowDynamic={true}
        />
      </div>
      <img className={styles.profile_image} src={imageUrl} alt={"skate image"} />
      <p className={styles.text}>{t("introduction")}</p>
      <p className={`${styles.text} ${styles.margin_top}`}>{t("main")}</p>
      <p className={`${styles.text} ${styles.margin_top}`}>{t("end")}</p>
    </div>
  );
};
