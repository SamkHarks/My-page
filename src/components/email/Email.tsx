import { useTranslation } from 'react-i18next';
import * as styles from 'src/components/email/Email.module.css';
import { InputField } from 'src/components/email/InputField';
import { TextArea } from 'src/components/email/TextArea';


export const Email = (): React.JSX.Element => {
  const {t} = useTranslation('contact'); // Use the translation hook to get the translation function

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const form = event.currentTarget;
    if(!form.checkValidity()) {
      return; // Prevent submission if the form is invalid
    }
    // TODO: Handle form submission here
  }
  return (
    <div className={styles.container}>
      <form
        className={styles.form_container}
        noValidate={true}
        onSubmit={handleSubmit}
      >
        <p className={styles.header}>
          {t('form.intro.line1')}<br />
          {t('form.intro.line2_pre')}
          <span className={styles.line}>{t('form.intro.nan_equals')}</span>
          {t('form.intro.line2_mid')}
          <span className={styles.line}>{t('form.intro.false_text')}</span>
          <br />
          {t('form.intro.line3')}
        </p>
        <InputField
          label={t('form.name')}
          id={'name'}
          placeholder={t('form.placeholder.name')}
          type={'text'}
          required={true}
        />
        <InputField
          label={t('form.email')}
          id={'email'}
          placeholder={t('form.placeholder.email')}
          type={'email'}
          required={true}
          spellCheck={false}
        />
        <TextArea
          label={t('form.message')}
          id={'message'}
          placeholder={t('form.placeholder.message')}
          required={true}
          rows={10}
        />
        <button
          className={styles.submit_button}
          type={'submit'}
        >
          {t('form.submit')}
        </button>
      </form>
    </div>
  )
}