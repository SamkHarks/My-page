import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ICONS } from "src/components/sections/skills/utils";
import * as styles from "src/components/sections/skills/Skill.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";


type Props = {
  skill: string;
  category: string;
};

export const Skill = ({ skill, category }: Props): React.JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation("skills");
  const onClick = () => {
    setIsExpanded(!isExpanded);
  };
  const IconComponent = ICONS[skill];
  return (
    <button
      className={`${styles.button} ${isExpanded ? styles.selected : ""}`}
      key={skill}
      onClick={onClick}
    >
      <div className={styles.button_title_row}>
        <div className={styles.button_title}>
          {IconComponent && <IconComponent size={30} />}
          <p>{skill}</p>
        </div>
        <MdKeyboardArrowDown
          className={`${isExpanded ? styles.rotate_down : styles.rotate_up}`}
          size={20}
        />
      </div>
      {isExpanded && (
        <div className={styles.expanded}>
          <p className={styles.text}>{t(`${category}.${skill}`)}</p>
        </div>
      )}
    </button>
  );
};