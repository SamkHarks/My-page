import { useTranslation } from "react-i18next";
import { IoReload } from "react-icons/io5";
import * as styles from "src/common/components/boundaries/errorBoundary/BasicFallback.module.css";
import { HandledError } from "src/common/components/boundaries/errorBoundary/HandledError";
import { useTranslatedErrors } from "src/common/components/boundaries/errorBoundary/useTranslatedErrors";

type Props = {
  onResetError: () => void;
  variant: 'text' | 'icon' | 'default';
  size?: number;
  color?: string;
  error?: HandledError;
 }

export const BasicFallback = (props: Props): React.JSX.Element => {
  const { t } = useTranslation(['common']);
  const getTranslatedError = useTranslatedErrors();
  const message = getTranslatedError(props.error);
  if (props.variant === 'default') {
    return (
      <div className={styles.container}>
        <p
          className={styles.text}
          style={{
            color: props.color,
            fontSize: props.size
            }}>{message}
        </p>
        <button
          className={styles.button}
          onClick={props.onResetError}
          style={{color: props.color, borderColor: props.color}}
        >
          {t('reload')}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {props.variant === 'text'
      ? <p className={styles.text} style={{fontSize: props.size, color: props.color}}>{message}</p>
      : <IoReload
          size={props.size}
          onClick={props.onResetError}
          color={props.color}
        />
      }
    </div>
  )
}