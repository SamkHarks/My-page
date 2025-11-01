import { createRef } from "react";
import { Section, SectionRefs } from "src/common/types/sections/types";

export const useSectionRefs = (sections: Section[]): SectionRefs => {
  const refs = sections.reduce((acc, section) => {
    acc[section.id] = createRef<HTMLDivElement>();
    return acc;
  }, {} as SectionRefs);
  return refs;
};