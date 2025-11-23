import { useTranslation } from "react-i18next";
import * as styles from "src/features/home/Home.module.css";
import { useConfiguration } from "src/common/hooks/useConfiguration";
import { Button } from "src/features/home/components/Button";
import { getAssetUrl } from "src/common/api/http/clients";


export const Home = (): React.JSX.Element => {
  const { t } = useTranslation("home");
  const { paths } = useConfiguration();
  const imageUrl = getAssetUrl(paths.images.me);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{'Sami Härkönen'}</h1>
      <h2 className={styles.sub_title}>{t("punchLine", {work: t("work"), education: t("education")})}</h2>
      <p className={styles.text}>{t("shortIntro")}</p>
      <span className={styles.divider} />
      <div>
        <p className={styles.intro}>
          <img className={styles.sk8_image} src={imageUrl} alt={"picture of me"} />
          {t("intro")}
        </p>
        <Button />
      </div>
    </div>
  );
};
