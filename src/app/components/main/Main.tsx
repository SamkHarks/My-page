import { useConfiguration } from "src/common/hooks/useConfiguration";
import { ServiceData } from "src/common/components/serviceData/ServiceData";
import { SectionResponse } from "src/common/types/sections/types";
import { MainContent } from "src/app/components/main/MainContent";
import { useService } from "src/common/api/useService";



export const Main = (): React.JSX.Element => {
  const paths = useConfiguration().paths;
  const urlOptions = {path: paths.data.sections};
  const sections = useService<SectionResponse>({urlOptions});
  return <ServiceData service={sections.service} Renderer={MainContent} />;
};
