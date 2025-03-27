import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RxHamburgerMenu } from "react-icons/rx";
import { HeaderToolbarProps } from "src/components/header/types";
import * as styles from "src/components/header/toolbar/menuButton/MenuButton.module.css";


export const MenuButton = ({ isOpen, onClick }: HeaderToolbarProps): React.JSX.Element => {
  const [isPressed, setIsPressed] = useState(false);
  const { t } = useTranslation("common");
  const onClickAnimate = () => {
    setIsPressed(true);
    onClick();
  };
  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (isPressed) {
      timeout = setTimeout(() => setIsPressed(false), 500);
    }
    return () => clearTimeout(timeout);
    /**
     * This effect should only run when the isOpen state changes
     * TODO: check if there is better way to do this
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <button className={styles.header_button} onClick={onClickAnimate}>
      <RxHamburgerMenu
        className={`${styles.hamburger_icon} ${isPressed ? styles.animate : ""}`}
      />
      <span className={styles.button_text}>
        {t(isOpen ? "close" : "open")}
      </span>
    </button>
  );
};