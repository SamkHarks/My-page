import * as styles from "src/features/skills/components/skills/Skills.module.css";
import { useTranslatedSubcategories } from "src/features/skills/hooks";
import { Skill } from "src/features/skills/components/skill/Skill";
import { DataProps } from "src/components/serviceData/ServiceData";
import { SkillsResponse } from "src/features/skills/types";

export const SkillsContent = (props: DataProps<SkillsResponse>): React.JSX.Element => {
  const { skills } = props.data;
  const translatedSubcategories = useTranslatedSubcategories();
  return (
    <div className={styles.skills_container}>
      {skills.map((item) => {
        return (
          <section key={item.category} className={styles.category_container}>
            <h3>{item.category}</h3>
            <ol className={styles.subcategories_list}>
              {item.subcategories.map((subcategory) => (
              <li key={subcategory.name}>
                <h4>{translatedSubcategories[subcategory.name]}</h4>
                <div className={styles.items_container}>
                  {subcategory.items.map((skill) => (
                    <Skill
                      key={skill}
                      skill={skill}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ol>
          </section>
        );
      })}
    </div>
  );
};
