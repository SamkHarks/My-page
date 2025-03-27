import * as styles from "src/components/header/toolbar/HeaderToolbar.module.css";
import { RectangleProgress } from "src/components/rectangleProgress/RectangleProgress";
import { HeaderToolbarProps } from "src/components/header/types";
import { LanguageSelector } from "src/components/languageSelector/LanguageSelector";
import { Title } from "src/components/header/toolbar/title/Title";
import { MenuButton } from "src/components/header/toolbar/menuButton/MenuButton";



export const HeaderToolbar = (props: HeaderToolbarProps): React.JSX.Element => (
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