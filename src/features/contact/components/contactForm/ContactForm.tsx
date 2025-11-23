import { useTranslation } from 'react-i18next';
import * as styles from 'src/features/contact/components/contactForm/ContactForm.module.css';
import { InputField } from 'src/features/contact/components/contactForm/InputField';
import { TextArea } from 'src/features/contact/components/contactForm/TextArea';
import { Spinner } from 'src/common/components/spinner/Spinner';
import { useEmailService } from 'src/features/contact/api/useEmailService';
import { ContactFormType } from 'src/features/contact/components/contactForm/types';
import { Title } from 'src/features/contact/components/contactForm/Title';


export const ContactForm = (): React.JSX.Element => {
  const {t} = useTranslation('contact');
  const { sendEmail, isLoading, isSuccess, isError } = useEmailService();
 
  const handleSubmit = (event: React.FormEvent<ContactFormType>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if(!form.checkValidity()) {
      return; // Prevent submission if the form is invalid
    }

    const data = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      message: form.elements.message.value,
    };
    sendEmail(data);
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.form_container}
        noValidate={true}
        onSubmit={handleSubmit}
      >
        <Title isSuccess={isSuccess} isError={isError} />
        <InputField
          label={t('form.name')}
          id={'name'}
          placeholder={t('form.placeholder.name')}
          type={'text'}
          required={true}
          disabled={isSuccess}
          autoComplete={'name'}
        />
        <InputField
          label={t('form.email')}
          id={'email'}
          placeholder={t('form.placeholder.email')}
          type={'email'}
          required={true}
          spellCheck={false}
          disabled={isSuccess}
          autoComplete={'email'}
        />
        <TextArea
          label={t('form.message')}
          id={'message'}
          placeholder={t('form.placeholder.message')}
          required={true}
          disabled={isSuccess}
          rows={10}
        />
        {isLoading
        ? <div className={styles.spinner}><Spinner size={40} /></div>
        : <button
          className={styles.submit_button}
          type={'submit'}
          disabled={isSuccess || isError}
        >
          {t('form.submit')}
        </button>
        }
      </form>
    </div>
  )
}