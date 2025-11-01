import { useEffect, useState } from "react";
import { Home } from "src/features/home/Home";
import { About } from "src/features/about/About";
import { Skills } from "src/features/skills/Skills";
import { Contact } from "src/features/contact/Contact";
import { useSectionIntersectionObserver } from "src/app/components/sections/hooks/useSectionIntersectionObserver";
import { Section, SectionRefs } from "src/common/types/sections/types";
import { SectionWrapper } from "src/app/components/sections/components/SectionWrapper";

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
  useSectionIntersectionObserver(data);
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
