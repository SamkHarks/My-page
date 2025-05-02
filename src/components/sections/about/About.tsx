import { useTranslation } from "react-i18next";
import * as styles from "src/components/sections/about/About.module.css";
import { Animation } from "src/components/animation/Animation";
import { useConfiguration } from "src/hooks/hooks";
import { createUrl } from "src/utils/utils";

export const About = (): React.JSX.Element => {
  const {paths, baseUrls} = useConfiguration();
  const imageUrl = createUrl(paths.images.skate, baseUrls.firebase);
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
