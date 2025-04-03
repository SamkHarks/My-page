import { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import * as styles from "src/components/email/InputField.module.css";
import * as commonStyles from "src/components/email/Common.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

/*
const sanitizeText = (input: string): string => {
  return input.replace(/[^a-zA-Z\s'-]/g, '');
};

const sanitizeEmailCharacters = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9!#$%&'*+/=?^_`{|}~@.-]/g, '');
};

const validateEmail = (input: string, inputRef: React.RefObject<HTMLInputElement>) => {
  if (inputRef.current) {
    const sanitizedValue = sanitizeEmailCharacters(input);

    if (sanitizedValue !== input) {
      inputRef.current.setCustomValidity('Invalid characters detected in email.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
      inputRef.current.setCustomValidity('Please enter a valid email address.');
    } else {
      inputRef.current.setCustomValidity(''); // Clear the error
    }
  }
};

const validateText = (input: string, inputRef: React.RefObject<HTMLInputElement>) => {
  if (inputRef.current) {
    const sanitizedValue = sanitizeText(input);

    if (sanitizedValue !== input) {
      inputRef.current.setCustomValidity('Invalid characters detected in name.');
    } else {
      inputRef.current.setCustomValidity(''); // Clear the error
    }
  }
};*/

export const InputField = (props: Props): React.JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setValue(event.target.value);
    if (displayError/* && !inputRef.current?.validationMessage*/) {
      setDisplayError(false);
    }
  }

  const clearInput = (e: React.MouseEvent) => {
    e.preventDefault();
    inputRef.current?.focus();
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
          <input
            ref={inputRef}
            className={`${styles.input} ${displayError ? styles.error : ''}`}
            onFocus={handleFocus(true)}
            onBlur={handleFocus(false)}
            id={props.label}
            type={props.type}
            placeholder={props.placeholder}
            required={props.required}
            spellCheck={props.spellCheck}
            value={value}
            onInvalid={() => {setDisplayError(true)}}
            onChange={handleChange}
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
        {showButton && <button className={styles.clear_button} onClick={closeInput}>Cancel</button>}
      </div>
      {displayError && inputRef.current?.validationMessage && <p>{inputRef.current.validationMessage}</p>}
    </div>
  )
}
