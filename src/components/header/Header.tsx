import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../languageSelector/LanguageSelector";
import { SectionRefs } from "../../hooks/types";
import { RectangleProgress } from "../rectangleProgress/RectangleProgress";
import styles from "./Header.module.css";
import { Section } from "../../App";
import { RxHamburgerMenu } from "react-icons/rx";
import { useHeaderObserver } from "../../hooks/hooks";

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
      <SectionIdWrapper>
        <HeaderToggle
          onClick={onClick}
          isOpen={isOpen}
          sections={sections}
        />
        <HeaderSections
          onClick={onClick}
          sectionRefs={sectionRefs}
          isOpen={isOpen}
          sections={sections}
        />
      </SectionIdWrapper>
    </header>
  );
};

type HeaderToggleProps = {
  isOpen: boolean;
  onClick: () => void;
  sections: Section[];
}

const HeaderToggle = (props: HeaderToggleProps) => (
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

type ContextProps = {titleId: Section['id'], setTitleId: React.Dispatch<React.SetStateAction<"home" | "about" | "skills" | "contact">>}
const IdContext = React.createContext<ContextProps>({} as ContextProps);

const SectionIdWrapper = ({ children }: { children: React.ReactNode }) => {
  const [titleId, setTitleId] = useState<Section['id']>('home');
  return (
    <IdContext.Provider value={{ titleId, setTitleId }}>
      {children}
    </IdContext.Provider>
  );
};

const isTypeOfElementArray = (data: (HTMLElement| null)[]): data is HTMLElement[] => {
  return data.every((element) => element && element instanceof HTMLElement);
};


const Title = ({ sections, isOpen }: Omit<HeaderToggleProps, 'onClick'>) => {
  const { titleId, setTitleId } = React.useContext(IdContext);
  const [data, setData] = useState<HTMLElement[]>([]);
  const { t } = useTranslation("sections");

  React.useEffect(() => {
    const getData = () => {
      const elements = sections.map((section) => document.getElementById(section.id));
      if (isTypeOfElementArray(elements)) {
        setData(elements);
      }
      return;
    };
    if (data.length > 0) {
      return;
    }
    const id = setInterval(getData, 1000);
    return () => clearInterval(id);
  }, [data, sections]);
  useHeaderObserver(data, setTitleId);

  return (
    <span style={isOpen ? { opacity: 0 } : {}} className={styles.header_title}>
      {t(titleId)}
    </span>
  );
};

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

type HeaderSectionProps = HeaderProps & HeaderToggleProps;

const HeaderSections = ({
  onClick,
  sectionRefs,
  isOpen,
  sections,
}: HeaderSectionProps) => {
  const { t } = useTranslation("sections");
  const { titleId } = React.useContext(IdContext);
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
              style={section.id === titleId ? { color: "var(--color-cyan-secondary)" } : {}}
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
