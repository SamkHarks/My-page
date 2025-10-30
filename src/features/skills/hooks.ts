import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Item, Subcategory } from "src/features/skills/types";


export const useTranslatedSkills = (): Record<Item, string> => {
  const { t } = useTranslation("skills");

  return useMemo(() =>({
    React: t('Frontend.skill.React'),
    'React Native': t('Frontend.skill.React Native'),
    HTML5: t('Frontend.skill.HTML5'),
    CSS: t('Frontend.skill.CSS'),
    'Apollo GraphQL': t('Frontend.skill.Apollo GraphQL'),
    Redux: t('Frontend.skill.Redux'),
    'Redux-Saga': t('Frontend.skill.Redux-Saga'),
    SVG: t('Frontend.skill.SVG'),
    'Node.js': t('Backend.skill.Node'),
    Deno: t('Backend.skill.Deno'),
    Express: t('Backend.skill.Express'),
    'REST APIs': t('Backend.skill.REST APIs'),
    GraphQL: t('Backend.skill.GraphQL'),
    SQL: t('Backend.skill.SQL'),
    NoSQL: t('Backend.skill.NoSQL'),
    Firebase: t('Backend.skill.Firebase'),
    TypeScript: t('Misc.skill.TypeScript'),
    JavaScript: t('Misc.skill.JavaScript'),
    'C++': t('Misc.skill.C++'),
    Python: t('Misc.skill.Python'),
    Jest: t('Misc.skill.Jest'),
    Cypress: t('Misc.skill.Cypress'),
    Docker: t('Misc.skill.Docker'),
    'CI/CD': t('Misc.skill.CI/CD'),
    Webpack: t('Misc.skill.Webpack'),
    Git: t('Misc.skill.Git'),
  }), [t]);
}


export const useTranslatedSubcategories = (): Record<Subcategory, string> => {
  const { t } = useTranslation("skills");

  return useMemo(() =>({
    "Frameworks & Libraries": t("Frontend.subcategories.Frameworks & Libraries"),
    "Markup & Styling": t("Frontend.subcategories.Markup & Styling"),
    "State Management": t("Frontend.subcategories.State Management"),
    "Server State Management": t("Frontend.subcategories.Server State Management"),
    "Frameworks & Runtimes": t("Backend.subcategories.Frameworks & Runtimes"),
    "APIs": t("Backend.subcategories.APIs"),
    "Databases": t("Backend.subcategories.Databases"),
    "Cloud Services": t("Backend.subcategories.Cloud Services"),
    "Languages": t("Misc.subcategories.Languages"),
    "Testing": t("Misc.subcategories.Testing"),
    "DevOps & Tools": t("Misc.subcategories.DevOps & Tools"),
    "Version Control": t("Misc.subcategories.Version Control"),
  }), [t]);
}