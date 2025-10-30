import { Section, SectionRefs } from "src/common/types/sections/types";


export type HeaderProps = {
  sectionRefs: SectionRefs;
  sections: Section[];
};

export type HeaderToolbarProps = {
  isOpen: boolean;
  onClick: () => void;
  sections: Section[];
}

export type HeaderSectionProps = HeaderProps & HeaderToolbarProps;