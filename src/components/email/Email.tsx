import * as styles from 'src/components/email/Email.module.css';
import { InputField } from 'src/components/email/InputField';
import { TextArea } from 'src/components/email/TextArea';


export const Email = (): React.JSX.Element => {
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
        <InputField
          label={'name'}
          placeholder={'Your Name'}
          type={'text'}
          required={true}
        />
        <InputField
          label={'email'}
          placeholder={'Your.email@example.com'}
          type={'email'}
          required={true}
          spellCheck={false}
        />
        <TextArea
          label={'message'}
          placeholder={'Your message...'}
          required={true}
          rows={10}
        />
        <button type={'submit'}>Send</button>
      </form>
    </div>
  )
}