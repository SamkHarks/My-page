import { useEffect, useState } from "react";
import { useTranslatedSectionId } from "src/common/hooks/useTranslatedSectionId";
import { useSectionTitleIdContext } from "src/features/header/context/SectionIdProvider";
import { HeaderToolbarProps } from "src/features/header/types";
import { isTypeOfElementArray } from "src/features/header/utils";
import { useHeaderObserver } from "src/features/header/hooks/useHeaderObserver";
import * as styles from "src/features/header/components/headerTitle/HeaderTitle.module.css";



export const HeaderTitle = ({ sections, isOpen }: Omit<HeaderToolbarProps, 'onClick'>): React.JSX.Element => {
  const { titleId, setTitleId } = useSectionTitleIdContext();
  const [data, setData] = useState<HTMLElement[]>([]);
   const getTranslatedSectionById = useTranslatedSectionId();

  useEffect(() => {
    const getData = () => {
      const elements = sections.map((section) => document.getElementById(section.id));
      if (isTypeOfElementArray(elements)) {
        setData(elements);
      }
      return;
    };
    if (data.length > 0) {
      return;
    }
    const id = setInterval(getData, 1000);
    return () => clearInterval(id);
  }, [data, sections]);
  useHeaderObserver(data, setTitleId);

  return (
    <span className={`${styles.title} ${isOpen ? styles.hidden : styles.visible}`}>
      {getTranslatedSectionById(titleId)}
    </span>
  );
};