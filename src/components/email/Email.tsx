import { useTranslation } from 'react-i18next';
import * as styles from 'src/components/email/Email.module.css';
import { InputField } from 'src/components/email/InputField';
import { TextArea } from 'src/components/email/TextArea';
import { useEffect, useState } from 'react';
import { Spinner } from 'src/components/spinner/Spinner';
import { useEmailService } from 'src/components/email/hooks';
import { ContactForm } from 'src/components/email/types';
import { Title } from 'src/components/email/Title';


export const Email = (): React.JSX.Element => {
  const {t} = useTranslation('contact');
  const [formData, setFormData] = useState<{name: string, email: string, message: string} | null>(null);
  const {service, callService} = useEmailService(formData);

  useEffect(() => {
    if (formData) {
      callService();
    }
  },[formData, callService]);
 
  const handleSubmit = (event: React.FormEvent<ContactForm>) => {
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
    setFormData(data);
  }
  const isSuccess = service.state === 'SUCCESS';
  return (
    <div className={styles.container}>
      <form
        className={styles.form_container}
        noValidate={true}
        onSubmit={handleSubmit}
      >
        <Title state={service.state}/>
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
        {service.state === 'LOADING'
        ? <div className={styles.spinner}><Spinner size={40} /></div>
        : <button
          className={styles.submit_button}
          type={'submit'}
          disabled={isSuccess || service.state === 'FAILURE'}
        >
          {t('form.submit')}
        </button>
        }
      </form>
    </div>
  )
}