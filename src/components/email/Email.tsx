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
        <p className={styles.header}>Ready to build something great? <br />Want to discuss tech, opportunities, or why <span style={{color: 'blue'}}>NaN === NaN</span> is <span style={{color: 'blue'}}>false?</span> <br />Fill out the form below—I will get back ASAP!</p>
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
        <button
          className={styles.submit_button}
          type={'submit'}
        >
          Submit
        </button>
      </form>
    </div>
  )
}