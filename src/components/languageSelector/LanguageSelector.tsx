import { useTranslation } from "react-i18next";
import { Languages } from "src/i18n";
import * as styles from "src/components/languageSelector/LanguageSelector.module.css";

const LanguageSelector = (): React.JSX.Element => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: Languages) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.button_container}>
      <button
        className={styles.small_button}
        type={"button"}
        onClick={() => changeLanguage("fi")}
      >
        fi
      </button>
      <button
        className={styles.small_button}
        type={"button"}
        onClick={() => changeLanguage("en")}
      >
        en
      </button>
    </div>
  );
};

export { LanguageSelector };
