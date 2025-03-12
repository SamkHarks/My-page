import { getCVUrl } from "src/utils/utils"


export const getCVUrlFromLanguage = (language: string): string => {
  if (language === "en") {
    return getCVUrl("cv-sami-en.pdf");
  }
  return getCVUrl("cv-sami-fi.pdf");
}