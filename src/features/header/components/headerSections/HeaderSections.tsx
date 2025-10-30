import { HeaderSectionProps } from "src/features/header/types";
import { useSectionTitleIdContext } from "src/features/header/context/SectionIdProvider";
import { Section } from "src/types/sections/types";
import * as styles from "src/features/header/components/headerSections/HeaderSections.module.css";
import { useTranslatedSectionId } from "src/common/hooks/useTranslatedSectionId";

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