import * as styles from "src/components/header/Header.module.css";
import { RectangleProgress } from "src/components/rectangleProgress/RectangleProgress";
import { HeaderToggleProps } from "src/components/header/types";
import { LanguageSelector } from "src/components/languageSelector/LanguageSelector";
import { Title } from "src/components/header/Title";
import { MenuButton } from "src/components/header/MenuButton";



export const HeaderToggle = (props: HeaderToggleProps): React.JSX.Element => (
  <div className={styles.sticky_header}>
    <div className={styles.container_left}>
      <RectangleProgress text={"S.H"} size={60} />
      <LanguageSelector />
    </div>
    <Title sections={props.sections} isOpen={props.isOpen} />
    <div className={styles.container_right}>
      <MenuButton {...props} />
    </div>
  </div>
);