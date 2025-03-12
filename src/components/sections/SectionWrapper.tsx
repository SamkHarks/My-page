import { useTranslation } from "react-i18next";
import { Section } from "src/components/app/types";
import { getCanvasDimensions } from "src/components/animation/utils";
import { SectionRefs } from "src/hooks/types";
import { Animation } from "src/components/animation/Animation";
import * as styles from "src/components/sections/Sections.module.css";

type Props = {
  section: Section;
  sectionRefs: SectionRefs;
  children: React.ReactNode;
};

export const SectionWrapper = ({ section, sectionRefs, children }: Props): React.JSX.Element => {
  const { t } = useTranslation("sections");
  const isSkills = section.id === "skills";
  const dim = isSkills ? getCanvasDimensions('shockwave') : null;
  return (
    <div id={section.id} ref={sectionRefs[section.id]} className={styles.section}>
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
      {section.id !== "home" && <h1 className={styles.section_title}>{`\u00B7${t(section.id)}\u00B7`}</h1>}
      <div className={"section_content"}>{children}</div>
    </div>
  );
};