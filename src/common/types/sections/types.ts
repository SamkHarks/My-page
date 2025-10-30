export type Section = {
  id: "home" | "about" | "skills" | "contact";
};

export type SectionResponse = {
  sections: Section[];
};

export type SectionRefs = Record<
  Section["id"],
  React.RefObject<HTMLDivElement>
>;