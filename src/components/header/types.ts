import { Section } from "src/App";
import { SectionRefs } from "src/hooks/types";


export type HeaderProps = {
  sectionRefs: SectionRefs;
  sections: Section[];
};

export type HeaderToggleProps = {
  isOpen: boolean;
  onClick: () => void;
  sections: Section[];
}

export type HeaderSectionProps = HeaderProps & HeaderToggleProps;