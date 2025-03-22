import { useTranslation } from "react-i18next";
import { IoReload } from "react-icons/io5";
import * as styles from "src/components/boundaries/errorBoundary/BasicFallback.module.css";

type Props = {
  onResetError: () => void;
  variant: 'text' | 'icon' | 'default';
  size?: number;
  color?: string;
  message?: string;
 }

export const BasicFallback = (props: Props): React.JSX.Element => {
  const { t } = useTranslation('common');

  if (props.variant === 'default') {
    return (
      <div className={styles.container}>
        <p>{props.message ?? t('error')}</p>
        <button
          className={styles.button}
          onClick={props.onResetError}
        >
          {t('reload')}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {props.variant === 'text'
      ? <p style={{fontSize: props.size, color: props.color, fontWeight: 'bold'}}>{props.message ?? t('error')}</p>
      : <IoReload
          size={props.size}
          onClick={props.onResetError}
          color={props.color}
        />
      }
    </div>
  )
}