import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import * as styles from "src/components/email/InputField.module.css";
import * as commonStyles from "src/components/email/Common.module.css";
import { useTranslation } from "react-i18next";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

// TODO: Handle error messages, currently uses browser default messages
export const InputField = (props: Props): React.JSX.Element => {
  const { t } = useTranslation('contact');
  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.disabled) {
      setValue('');
    }
  }, [props.disabled]);
  
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
      <label className={commonStyles.label} htmlFor={props.id}>{props.label}</label>
      <div className={commonStyles.row_container}>
        <div className={commonStyles.field_container}>
          <input
            ref={inputRef}
            className={`${styles.input} ${displayError ? styles.error : ''}`}
            onFocus={handleFocus(true)}
            onBlur={handleFocus(false)}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            required={props.required}
            spellCheck={props.spellCheck}
            value={value}
            onInvalid={() => {setDisplayError(true)}}
            onChange={handleChange}
            disabled={props.disabled}
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
        {showButton && <button className={styles.clear_button} onClick={closeInput}>{t('form.cancel')}</button>}
      </div>
      {displayError && inputRef.current?.validationMessage && <p className={commonStyles.error_message}>{inputRef.current.validationMessage}</p>}
    </div>
  )
}
