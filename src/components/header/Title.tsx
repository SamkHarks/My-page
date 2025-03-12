import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSectionTitleIdContext } from "src/components/header/SectionIdProvider";
import { HeaderToggleProps } from "src/components/header/types";
import { isTypeOfElementArray } from "src/components/header/utils";
import { useHeaderObserver } from "src/hooks/hooks";
import * as styles from "src/components/header/Header.module.css";



export const Title = ({ sections, isOpen }: Omit<HeaderToggleProps, 'onClick'>): React.JSX.Element => {
  const { titleId, setTitleId } = useSectionTitleIdContext();
  const [data, setData] = useState<HTMLElement[]>([]);
  const { t } = useTranslation("sections");

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
    <span style={isOpen ? { opacity: 0 } : {}} className={styles.header_title}>
      {t(titleId)}
    </span>
  );
};