import { useTranslation } from "react-i18next";
import { Section } from "src/common/types/sections/types";


export const useTranslatedSectionId = (
): (id: Section['id']) => string => {
  const { t } = useTranslation("sections");
  const translatedSections = {
    home: t('home'),
    contact: t('contact'),
    skills: t('skills'),
    about: t('about'),
  }

  return (id: Section['id']) => translatedSections[id];
}