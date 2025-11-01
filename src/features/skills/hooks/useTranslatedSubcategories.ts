import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Subcategory } from "src/features/skills/types";



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