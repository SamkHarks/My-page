import { HeaderToolbarProps } from "src/common/components/header/types";
import * as styles from "src/common/components/header/components/headerButton/HeaderButton.module.css";


export const HeaderButton = ({ isOpen, onClick }: HeaderToolbarProps): React.JSX.Element => (
  <button 
    className={styles.header_button} 
    onClick={onClick}
  >
    <div className={`${styles.hamburger_icon} ${isOpen ? styles.open : ""}`}>
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </div>
  </button>
);