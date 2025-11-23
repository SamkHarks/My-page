import * as styles from "src/features/skills/Skills.module.css";
import { Skill } from "src/features/skills/components/skill/Skill";
import { SkillsResponse } from "src/features/skills/types";
import { useTranslatedSubcategories } from "src/features/skills/hooks/useTranslatedSubcategories";
import { useConfiguration } from "src/common/hooks/useConfiguration";
import { publicClient } from "src/common/api/http/clients";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Skills = (): React.JSX.Element => {
  const { paths } = useConfiguration();
  const { data } = useSuspenseQuery({
    queryKey: ['skills'],
    queryFn: () => publicClient.get<SkillsResponse>(paths.data.skills).then(res => res.body),
    staleTime: Infinity,
  })
  const { skills } = data;
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
