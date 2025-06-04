import { HeaderSectionProps } from "src/components/header/types";
import { useSectionTitleIdContext } from "src/components/header/SectionIdProvider";
import { Section } from "src/components/app/types";
import * as styles from "src/components/header/sections/HeaderSections.module.css";
import { useTranslatedSectionId } from "src/hooks/hooks";

export const HeaderSections = ({
  onClick,
  sectionRefs,
  isOpen,
  sections,
}: HeaderSectionProps): React.JSX.Element => {
  const getTranslatedSectionById = useTranslatedSectionId();
  const { titleId } = useSectionTitleIdContext();
  const scrollToSection = (sectionId: Section["id"]) => {
    const section = sectionRefs[sectionId];
    if (section.current) {
      onClick();
      section.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <nav
      className={`${styles.header_sections} ${isOpen ? styles.open : styles.closed}`}
    >
      <ol
        className={`${styles.custom_colors} ${
          isOpen ? styles.visible : styles.hidden
        }`}
      >
        {sections.map((section) => {
          return (
            <li
              key={section.id}
              style={section.id === titleId ? { color: "var(--color-cyan-secondary)" } : {}}
              className={styles.li_item}
              onClick={() => scrollToSection(section.id)}
            >
              {getTranslatedSectionById(section.id)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};