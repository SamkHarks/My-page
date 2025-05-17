type SkillsData = {
  category: "Frontend" | "Backend" | "Misc";
  subcategories: Array<{
    name: string;
    items: string[];
  }>;
};

export type SkillsResponse = {
  skills: SkillsData[];
};
