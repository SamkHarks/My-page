import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "src/types/sections/types";


export const useTranslatedSectionId = (
): (id: Section['id']) => string => {
  const { t } = useTranslation("sections");
  const translatedSections = useMemo(
    () => ({
      home: t('home'),
      contact: t('contact'),
      skills: t('skills'),
      about: t('about'),
    }),
    [t]
  );

  return (id: Section['id']) => translatedSections[id];
}