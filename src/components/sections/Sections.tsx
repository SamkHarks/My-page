import React, { useEffect, useState } from "react";
import { Home } from "./home/Home";
import { About } from "./about/About";
import { Skills } from "./skills/Skills";
import { Contact } from "./contact/Contact";
import { useInterSectionObserver } from "../../hooks/hooks";
import { SectionRefs } from "../../hooks/types";
import { useTranslation } from "react-i18next";
import styles from "./Sections.module.css";
import { Section } from "../../App";
import { Animation } from "../animation/Animation";
import { getCanvasDimensions } from "../animation/utils";

const components: Record<Section["id"], React.ComponentType> = {
  home: Home,
  about: About,
  skills: Skills,
  contact: Contact,
};

type Props = {
  section: Section;
  sectionRefs: SectionRefs;
  children: React.ReactNode;
};

const SectionWrapper = ({ section, sectionRefs, children }: Props) => {
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
          />
        </div>
      }
      {section.id !== "home" && <h1 className={styles.section_title}>{`\u00B7${t(section.id)}\u00B7`}</h1>}
      <div className={"section_content"}>{children}</div>
    </div>
  );
};

type SectionProps = {
  sections: Section[];
  sectionRefs: SectionRefs;
};

const Sections = ({ sectionRefs, sections }: SectionProps) => {
  const [data, setData] = useState<Element[]>([]);
  useEffect(() => {
    const queryData = document.querySelectorAll(".section_content");
    setData([...queryData]);
  }, []);
  useInterSectionObserver(data);
  return (
    <>
      {sections.map((section) => {
        const SectionComponent = components[section.id];
        return (
          <SectionWrapper
            key={section.id}
            section={section}
            sectionRefs={sectionRefs}
          >
            <SectionComponent />
          </SectionWrapper>
        );
      })}
    </>
  );
};

export default Sections;
