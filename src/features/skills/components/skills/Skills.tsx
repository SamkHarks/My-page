import * as styles from "src/features/skills/components/skills/Skills.module.css";
import { useConfiguration } from "src/common/hooks/useConfiguration";
import { SkillsResponse } from "src/features/skills/types";
import { ServiceData } from "src/common/components/serviceData/ServiceData";

import { Spinner } from "src/common/components/spinner/Spinner";
import { SkillsContent } from "src/features/skills/components/skills/SkillsContent";
import { useService } from "src/common/api/useService";


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
      Renderer={SkillsContent}
    />
  );
};
