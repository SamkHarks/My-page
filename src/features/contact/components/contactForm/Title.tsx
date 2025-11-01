import { useTranslation } from "react-i18next";
import * as styles from "src/features/contact/components/contactForm/Title.module.css";

type Props = {
  state: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE';
}

export const Title = (props: Props): React.JSX.Element => {
  const {t} = useTranslation('contact');
  const isSuccess = props.state === 'SUCCESS';
  const isFailure = props.state === 'FAILURE';

  const getTitleOnResolution = () => {
    return isSuccess ? t('form.success.line1') : t('form.failure.line1');
  }

  return (
    <p className={styles.header}>
      {
        isSuccess || isFailure ? (
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