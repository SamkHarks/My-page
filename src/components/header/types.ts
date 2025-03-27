import { Section } from "src/components/app/types";
import { SectionRefs } from "src/hooks/types";


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