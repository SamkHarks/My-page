import * as styles from "src/features/header/components/headerToolbar/HeaderToolbar.module.css";
import { RectangleProgress } from "src/features/header/components/rectangleProgress/RectangleProgress";
import { HeaderToolbarProps } from "src/features/header/types";
import { LanguageSelector } from "src/features/header/components/languageSelector/LanguageSelector";
import { Title } from "src/features/header/components/title/Title";
import { MenuButton } from "src/features/header/components/menuButton/MenuButton";



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