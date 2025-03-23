import * as styles from "src/components/boundaries/errorBoundary/DefaultFallback.module.css";
import { BasicFallback } from "src/components/boundaries/errorBoundary/BasicFallback";
import { HandledError } from "src/components/boundaries/errorBoundary/HandledError";

type Props = {
  onResetError: () => void;
  error?: HandledError;
}

export const DefaultFallback = (props: Props): React.JSX.Element => (
  <div className={styles.container}>
    <BasicFallback
      onResetError={props.onResetError}
      variant={'default'}
      error={props.error}
      size={32}
    />
  </div>
);
