export type SkillsItemsMap = {
  Frontend: {
    "Frameworks & Libraries": ["React", "React Native"];
    "Markup & Styling": ["HTML5", "CSS", "SVG"];
    "State Management": ["Redux", "Redux-Saga"];
    "Server State Management": ["Apollo GraphQL"];
  };
  Backend: {
    "Frameworks & Runtimes": ["Node.js", "Deno", "Express"];
    APIs: ["REST APIs", "GraphQL"];
    Databases: ["SQL", "NoSQL"];
    "Cloud Services": ["Firebase"];
  };
  Misc: {
    Languages: ["TypeScript", "JavaScript", "C++", "Python"];
    Testing: ["Jest", "Cypress"];
    "DevOps & Tools": ["Docker", "CI/CD", "Webpack"];
    "Version Control": ["Git"];
  };
};

export type Category = keyof SkillsItemsMap;

type SubcategoryEntry<C extends Category> = {
  [S in keyof SkillsItemsMap[C]]: {
    name: S;
    items: SkillsItemsMap[C][S];
  }
}[keyof SkillsItemsMap[C]];

export type Skills<C extends Category> = {
  category: C;
  subcategories: Array<SubcategoryEntry<C>>;
};



export type FrontendSkills = Skills<"Frontend">;
export type BackendSkills = Skills<"Backend">;
export type MiscSkills = Skills<"Misc">;


export type SkillsList = FrontendSkills | BackendSkills | MiscSkills;

export type SkillsResponse = {
  skills: SkillsList[];
};

export type Item = SkillsList["subcategories"][number]["items"][number];

export type Subcategory = {
  [K in keyof SkillsItemsMap]: keyof SkillsItemsMap[K]
}[keyof SkillsItemsMap];