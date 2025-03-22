import * as styles from "src/components/boundaries/errorBoundary/DefaultFallback.module.css";
import { BasicFallback } from "src/components/boundaries/errorBoundary/BasicFallback";

type Props = {
  onResetError: () => void;
  message?: string;
}

export const DefaultFallback = (props: Props): React.JSX.Element => (
  <div className={styles.container}>
    <BasicFallback
      onResetError={props.onResetError}
      variant={'default'}
      message={props.message}
      size={32}
    />
  </div>
);
