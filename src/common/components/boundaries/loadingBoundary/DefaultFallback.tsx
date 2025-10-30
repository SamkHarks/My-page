import { Spinner } from "src/common/components/spinner/Spinner"
import * as styles from "src/common/components/boundaries/loadingBoundary/DefaultFallback.module.css"

export const DefaultFallback = (): React.JSX.Element => (
  <div className={styles.container}><Spinner size={'medium'} /></div>
);
