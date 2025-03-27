import { HeaderSectionProps } from "src/components/header/types";
import { useSectionTitleIdContext } from "src/components/header/SectionIdProvider";
import { Section } from "src/components/app/types";
import { useTranslation } from "react-i18next";
import * as styles from "src/components/header/sections/HeaderSections.module.css";

export const HeaderSections = ({
  onClick,
  sectionRefs,
  isOpen,
  sections,
}: HeaderSectionProps): React.JSX.Element => {
  const { t } = useTranslation("sections");
  const { titleId } = useSectionTitleIdContext();
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