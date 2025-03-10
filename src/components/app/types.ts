export type Section = {
  id: "home" | "about" | "skills" | "contact";
};

export type SectionResponse = {
  sections: Section[];
};