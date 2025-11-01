import * as styles from 'src/features/contact/components/contactForm/TextArea.module.css';
import * as commonStyles from 'src/features/contact/components/contactForm/Common.module.css';
import { useEffect, useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

// TODO: Handle error messages, currently uses browser default messages
export const TextArea = (props: Props): React.JSX.Element => {
  const {t} = useTranslation('contact');
  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (props.disabled) {
      setValue('');
    }
  }, [props.disabled]);
  
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
      <label className={commonStyles.label} htmlFor={props.id}>{props.label}</label>
      <div className={commonStyles.row_container}>
        <div className={commonStyles.field_container}>
          <textarea
            ref={textAreaRef}
            className={`${styles.text_area} ${displayError ? styles.error : ''}`}
            id={props.id}
            placeholder={props.placeholder} 
            rows={props.rows}
            required={props.required}
            onChange={handleChange}
            onFocus={handleFocus(true)}
            onBlur={handleFocus(false)}
            onInvalid={() => {setDisplayError(true)}}
            value={value}
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
       {displayError && textAreaRef.current?.validationMessage && <p className={commonStyles.error_message}>{textAreaRef.current.validationMessage}</p>}
    </div>
  )
}