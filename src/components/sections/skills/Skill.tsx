import { useState } from "react";
import { ICONS } from "src/components/sections/skills/utils";
import * as styles from "src/components/sections/skills/Skill.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { type Item } from "src/components/sections/skills/types";
import { useTranslatedSkills } from "src/components/sections/skills/hooks";


type Props = {
  skill: Item;
};

export const Skill = (props: Props): React.JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const translatedSkills = useTranslatedSkills();
  const onClick = () => {
    setIsExpanded(!isExpanded);
  };
  const IconComponent = ICONS[props.skill];
  return (
    <button
      className={`${styles.button} ${isExpanded ? styles.selected : ""}`}
      key={props.skill}
      onClick={onClick}
    >
      <div className={styles.button_title_row}>
        <div className={styles.button_title}>
          {IconComponent && <IconComponent size={30} />}
          <p>{props.skill}</p>
        </div>
        <MdKeyboardArrowDown
          className={`${isExpanded ? styles.rotate_down : styles.rotate_up}`}
          size={20}
        />
      </div>
      {isExpanded && (
        <div className={styles.expanded}>
          <p className={styles.text}>{translatedSkills[props.skill]}</p>
        </div>
      )}
    </button>
  );
};