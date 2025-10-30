import { useTranslatedSectionId } from "src/common/hooks/useTranslatedSectionId";
import { Section, SectionRefs } from "src/types/sections/types";
import { getCanvasDimensions } from "src/components/animation/utils";
import { Animation } from "src/components/animation/Animation";
import * as styles from "src/app/sections/Sections.module.css";

type Props = {
  section: Section;
  sectionRefs: SectionRefs;
  children: React.ReactNode;
};

export const SectionWrapper = ({ section, sectionRefs, children }: Props): React.JSX.Element => {
  const getTranslatedSectionById = useTranslatedSectionId();
  const isSkills = section.id === "skills";
  const dim = isSkills ? getCanvasDimensions('shockwave') : null;
  return (
    <section id={section.id} ref={sectionRefs[section.id]} className={styles.section}>
      {isSkills &&
        <div className={styles.canvas}>
          <Animation
            type={'shockwave'}
            width={dim?.width ?? window.innerWidth}
            height={dim?.height ?? 100}
            numVertices={window.innerWidth > 600 ? 100 : 50}
            allowDynamic={false}
          />
        </div>
      }
      {section.id !== "home" && <h2 className={styles.section_title}>{`\u00B7${getTranslatedSectionById(section.id)}\u00B7`}</h2>}
      <div className={"section_content"}>{children}</div>
    </section>
  );
};