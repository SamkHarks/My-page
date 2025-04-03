import * as styles from 'src/components/email/TextArea.module.css';
import * as commonStyles from 'src/components/email/Common.module.css';
import { useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

// TODO: Handle error messages, currently uses browser default messages
export const TextArea = (props: Props): React.JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    if (displayError) {
      setDisplayError(false);
    }
  }

  const clearInput = (e: React.MouseEvent) => {
    e.preventDefault();
    textAreaRef.current?.focus();
    setValue('');
  }

  const closeInput = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue('');
    setDisplayError(false);
  }

  const handleFocus = (newFocus: boolean) => {
    return () => setIsFocused(newFocus);
  }

  const showButton = value.length > 0;

  return (
    <div className={commonStyles.container}>
      <label className={commonStyles.label} htmlFor={props.label}>{props.label}</label>
      <div className={commonStyles.row_container}>
        <div className={commonStyles.field_container}>
          <textarea
            ref={textAreaRef}
            className={`${styles.text_area} ${displayError ? styles.error : ''}`}
            id={props.label}
            placeholder={props.placeholder} 
            rows={props.rows}
            required={props.required}
            onChange={handleChange}
            onFocus={handleFocus(true)}
            onBlur={handleFocus(false)}
            onInvalid={() => {setDisplayError(true)}}
            value={value}
          />
          {showButton && isFocused &&
            <IoCloseOutline
              className={styles.inner_clear_button}
              onClick={clearInput}
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
              size={25}
            />
          }
        </div>
        {showButton && <button className={styles.clear_button} onClick={closeInput}>Kumoa</button>}
      </div>
       {displayError && textAreaRef.current?.validationMessage && <p className={commonStyles.error_message}>{textAreaRef.current.validationMessage}</p>}
    </div>
  )
}