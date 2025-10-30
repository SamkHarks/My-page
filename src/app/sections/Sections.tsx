import { useEffect, useState } from "react";
import { Home } from "src/components/sections/home/Home";
import { About } from "src/features/about/About";
import { Skills } from "src/features/skills/components/skills/Skills";
import { Contact } from "src/features/contact/components/Contact";
import { useInterSectionObserver } from "src/hooks/hooks";
import { Section, SectionRefs } from "src/types/sections/types";
import { SectionWrapper } from "src/app/sections/SectionWrapper";

const components: Record<Section["id"], React.ComponentType> = {
  home: Home,
  about: About,
  skills: Skills,
  contact: Contact,
};

type Props = {
  sections: Section[];
  sectionRefs: SectionRefs;
};

const Sections = (props: Props): React.JSX.Element => {
  const [data, setData] = useState<Element[]>([]);
  useEffect(() => {
    const queryData = document.querySelectorAll(".section_content");
    setData([...queryData]);
  }, []);
  useInterSectionObserver(data);
  return (
    <>
      {props.sections.map((section) => {
        const SectionComponent = components[section.id];
        return (
          <SectionWrapper
            key={section.id}
            section={section}
            sectionRefs={props.sectionRefs}
          >
            <SectionComponent />
          </SectionWrapper>
        );
      })}
    </>
  );
};

export default Sections;
