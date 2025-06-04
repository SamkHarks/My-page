import { useEffect, useState } from "react";
import { useTranslatedSectionId } from "src/hooks/hooks";
import { useSectionTitleIdContext } from "src/components/header/SectionIdProvider";
import { HeaderToolbarProps } from "src/components/header/types";
import { isTypeOfElementArray } from "src/components/header/utils";
import { useHeaderObserver } from "src/hooks/hooks";
import * as styles from "src/components/header/toolbar/title/Title.module.css";



export const Title = ({ sections, isOpen }: Omit<HeaderToolbarProps, 'onClick'>): React.JSX.Element => {
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