import { useTranslation } from "react-i18next";
import { Languages } from "src/i18n";
import * as styles from "src/components/languageSelector/LanguageSelector.module.css";
import { useEffect, useState } from "react";
import { Spinner } from "src/components/spinner/Spinner";

//TODO: handle error state
const LanguageSelector = (): React.JSX.Element => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLanguageChanged = () => setIsLoading(false);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    }
  }, [i18n]);

  const changeLanguage = (lng: Languages) => {
    setIsLoading(true);
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.button_container}>
      { isLoading
      ? <Spinner size={30} />
      : (
          <>
            <button
              className={styles.small_button}
              type={"button"}
              onClick={() => changeLanguage("fi")}
            >
              {'fi'}
            </button>
            <button
              className={styles.small_button}
              type={"button"}
              onClick={() => changeLanguage("en")}
            >
              {'en'}
            </button>
          </>
        )
      }
    </div>
  );
};

export { LanguageSelector };
