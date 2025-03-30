import * as styles from 'src/components/email/Email.module.css';
import { InputField } from 'src/components/email/InputField';


export const Email = (): React.JSX.Element => {

  return (
    <div className={styles.container}>
      <form className={styles.form_container}>
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
        <div className={styles.input_container}>
          <label className={styles.label} htmlFor={"message"}>Message</label>
          <textarea
            className={styles.input}
            id={"message"}
            placeholder={"Your message here..."} 
            rows={5}
            required={true}
          />
        </div>
        <button type={'submit'}>Send</button>
      </form>
    </div>
  )
}