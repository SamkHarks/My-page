import "src/components/app/App.css";
import { useFetchData } from "src/hooks/hooks";
import { ServiceData } from "src/components/serviceData/ServiceData";
import { SectionResponse } from "src/components/app/types";
import { AppContent } from "src/components/app/AppContent";



export const AppLoader = (): React.JSX.Element => {
  const sections = useFetchData<SectionResponse>("sections.json");
  return (
    <div className={"App"}>
      <ServiceData service={sections.service} Renderer={AppContent} />
    </div>
  );
};
