import { useConfiguration } from "src/common/hooks/useConfiguration";
import { ServiceData } from "src/common/components/serviceData/ServiceData";
import { SectionResponse } from "src/common/types/sections/types";
import { AppContent } from "src/app/appPage/AppContent";
import { useService } from "src/common/api/useService";



export const AppLoader = (): React.JSX.Element => {
  const paths = useConfiguration().paths;
  const urlOptions = {path: paths.data.sections};
  const sections = useService<SectionResponse>({urlOptions});
  return <ServiceData service={sections.service} Renderer={AppContent} />;
};
