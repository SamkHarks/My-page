import { useConfiguration, useService } from "src/hooks/hooks";
import { ServiceData } from "src/components/serviceData/ServiceData";
import { SectionResponse } from "src/components/app/types";
import { AppContent } from "src/components/app/AppContent";



export const AppLoader = (): React.JSX.Element => {
  const paths = useConfiguration().paths;
  const urlOptions = {path: paths.data.sections};
  const sections =  useService<SectionResponse>({urlOptions});
  return <ServiceData service={sections.service} Renderer={AppContent} />;
};
