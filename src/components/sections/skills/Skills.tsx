import * as styles from "src/components/sections/skills/Skills.module.css";
import { useConfiguration, useService } from "src/hooks/hooks";
import { SkillsResponse } from "src/components/sections/skills/types";
import { DataProps, ServiceData } from "src/components/serviceData/ServiceData";
import { Skill } from "src/components/sections/skills/Skill";
import { Spinner } from "src/components/spinner/Spinner";

export const Skills = (): React.JSX.Element => {
  const paths = useConfiguration().paths;
  const urlOptions = { path: paths.data.skills };
  const skills = useService<SkillsResponse>({urlOptions})//useFetchData<SkillsResponse>(paths.data.skills);
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
  return (
    <div className={styles.skills_container}>
      {skills.map((item) => {
        return (
          <div key={item.category} className={styles.category_container}>
            <h3>{item.category}</h3>
            <div className={styles.items_container}>
              {item.items.map((skill) => {
                return (
                  <Skill key={skill} skill={skill} category={item.category} />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
