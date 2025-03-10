import "src/components/app/App.css";
import { useFetchData } from "src/hooks/hooks";
import { ServiceData } from "src/components/serviceData/ServiceData";
import { SectionResponse } from "src/components/app/types";
import { AppContent } from "src/components/app/AppContent";



const App = (): React.JSX.Element => {
  const service = useFetchData<SectionResponse>("sections.json");
  return (
    <div className={"App"}>
      <ServiceData service={service} Renderer={AppContent} />
    </div>
  );
};

export default App;
