import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../languageSelector/LanguageSelector";
import { SectionRefs } from "../../hooks/types";
import { RectangleProgress } from "../rectangleProgress/RectangleProgress";
import styles from "./Header.module.css";
import { Section } from "../../App";
import { RxHamburgerMenu } from "react-icons/rx";

type HeaderProps = {
  sectionRefs: SectionRefs;
  sections: Section[];
};
export const Header = ({ sectionRefs, sections }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header>
      <HeaderToggle onClick={onClick} isOpen={isOpen} />
      <HeaderSections
        onClick={onClick}
        sectionRefs={sectionRefs}
        isOpen={isOpen}
        sections={sections}
      />
    </header>
  );
};

type HeaderToggleProps = {
  isOpen: boolean;
  onClick: () => void;
};

const HeaderToggle = (props: HeaderToggleProps) => (
  <div className={styles.sticky_header}>
    <div className={styles.container_left}>
      <RectangleProgress text={"S.H"} size={60} />
      <LanguageSelector />
    </div>
    <div className={styles.container_right}>
      <MenuButton {...props} />
    </div>
  </div>
);

const MenuButton = ({ isOpen, onClick }: HeaderToggleProps) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const { t } = useTranslation("common");
  const onClickAnimate = () => {
    setIsPressed(true);
    onClick();
  };
  React.useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (isPressed) {
      timeout = setTimeout(() => setIsPressed(false), 500);
    }
    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <button className={styles.header_button} onClick={onClickAnimate}>
      <RxHamburgerMenu
        className={`${styles.hamburger_icon} ${isPressed ? styles.animate : ""}`}
      />
      <span className={styles.button_text}>
        {isOpen ? t("close") : t("open")}
      </span>
    </button>
  );
};

type HeaderSectionProps = HeaderProps & HeaderToggleProps;

const HeaderSections = ({
  onClick,
  sectionRefs,
  isOpen,
  sections,
}: HeaderSectionProps) => {
  const { t } = useTranslation("sections");
  const scrollToSection = (sectionId: Section["id"]) => {
    const section = sectionRefs[sectionId];
    if (section.current) {
      onClick();
      section.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      className={`${styles.header_sections} ${isOpen ? styles.open : styles.closed}`}
    >
      <ol className={styles.custom_colors}>
        {sections.map((section) => {
          return (
            <li
              key={section.id}
              className={styles.li_item}
              onClick={() => scrollToSection(section.id)}
            >
              {t(section.id)}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
