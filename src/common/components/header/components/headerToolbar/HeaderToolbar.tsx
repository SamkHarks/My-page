import * as styles from "src/common/components/header/components/headerToolbar/HeaderToolbar.module.css";
import { HeaderLogo } from "src/common/components/header/components/headerLogo/HeaderLogo";
import { HeaderToolbarProps } from "src/common/components/header/types";
import { LanguageSelector } from "src/common/components/header/components/languageSelector/LanguageSelector";
import { HeaderTitle } from "src/common/components/header/components/headerTitle/HeaderTitle";
import { HeaderButton } from "src/common/components/header/components/headerButton/HeaderButton";



export const HeaderToolbar = (props: HeaderToolbarProps): React.JSX.Element => (
  <div className={styles.sticky_header}>
    <div className={styles.container_left}>
      <HeaderLogo text={"S.H"} size={60} />
      <LanguageSelector />
    </div>
    <HeaderTitle sections={props.sections} isOpen={props.isOpen} />
    <div className={styles.container_right}>
      <HeaderButton {...props} />
    </div>
  </div>
);