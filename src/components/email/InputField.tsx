import { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import * as styles from "src/components/email/InputField.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const InputField = (props: Props): React.JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const clearInput = (e: React.MouseEvent) => {
    e.preventDefault();
    inputRef.current?.focus();
    setValue('');
  }

  const closeInput = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue('');
  }

  const handleFocus = (newFocus: boolean) => {
    return () => setIsFocused(newFocus);
  }

  const showButton = value.length > 0;

  return (
    <div className={styles.container}>     
      <label className={styles.label} htmlFor={props.label}>{props.label}</label>
      <div className={styles.row_container}>
        <div className={styles.input_container}>
          <input
            ref={inputRef}
            className={styles.input}
            onFocus={handleFocus(true)}
            onBlur={handleFocus(false)}
            id={props.label}
            type={props.type}
            placeholder={props.placeholder}
            required={props.required}
            spellCheck={props.spellCheck}
            value={value}
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
    </div>
  )
}
