import { useTranslation } from "react-i18next";
import * as styles from "src/features/contact/components/contactForm/Title.module.css";

type Props = {
  isSuccess: boolean;
  isError: boolean;
}

export const Title = (props: Props): React.JSX.Element => {
  const {t} = useTranslation('contact');

  const getTitleOnResolution = () => {
    return props.isSuccess ? t('form.success.line1') : t('form.failure.line1');
  }

  return (
    <p className={styles.header}>
      {
        props.isSuccess || props.isError ? (
          <>{getTitleOnResolution()}</>
        ) : (
          <>
            {t('form.intro.line1')}<br />
            {t('form.intro.line2_pre')}
            <span className={styles.line}>{t('form.intro.nan_equals')}</span>
            {t('form.intro.line2_mid')}
            <span className={styles.line}>{t('form.intro.false_text')}</span>
            <br />
            {t('form.intro.line3')}
          </>
        )
      }
    </p>
  );
}