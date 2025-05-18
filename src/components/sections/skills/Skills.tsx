import * as styles from "src/components/sections/skills/Skills.module.css";
import { useConfiguration, useService } from "src/hooks/hooks";
import { SkillsResponse } from "src/components/sections/skills/types";
import { DataProps, ServiceData } from "src/components/serviceData/ServiceData";
import { Skill } from "src/components/sections/skills/Skill";
import { Spinner } from "src/components/spinner/Spinner";
import { useTranslation } from "react-i18next";

export const Skills = (): React.JSX.Element => {
  const paths = useConfiguration().paths;
  const urlOptions = { path: paths.data.skills };
  const skills = useService<SkillsResponse>({urlOptions});
  return (
    <ServiceData
      service={skills.service}
      LoadingFallback={
        <div className={styles.loading_container}>
          <Spinner size={'medium'} />
        </div>
      }
      Renderer={Renderer}
    />
  );
};

// eslint-disable-next-line react/no-multi-comp
const Renderer = (props: DataProps<SkillsResponse>) => {
  const { skills } = props.data;
  const { t } = useTranslation("skills");
  return (
    <div className={styles.skills_container}>
      {skills.map((item) => {
        return (
          <section key={item.category} className={styles.category_container}>
            <h3>{item.category}</h3>
            <ol className={styles.subcategories_list}>
              {item.subcategories.map((subcategory) => (
              <li key={subcategory.name}>
                <h4>{t(`${item.category}.subcategories.${subcategory.name}`)}</h4>
                <div className={styles.items_container}>
                  {subcategory.items.map((skill) => (
                    <Skill
                      key={skill}
                      skill={skill}
                      category={item.category}
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
