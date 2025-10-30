import { createRef } from "react";
import { Section, SectionRefs } from "src/types/sections/types";

export const useRefs = (sections: Section[]): SectionRefs => {
  const refs = sections.reduce((acc, section) => {
    acc[section.id] = createRef<HTMLDivElement>();
    return acc;
  }, {} as SectionRefs);
  return refs;
};