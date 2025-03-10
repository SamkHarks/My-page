import { lazy, Suspense } from "react";
import "src/App.css";
import { useFetchData, useRefs } from "src/hooks/hooks";
import { Header } from "src/components/header/Header";
import { DataProps, ServiceData } from "src/components/serviceData/ServiceData";
import { MouseTrackerBackground } from "src/components/mouseTrackerBackground/MouseTrackerBackground";
import { Loader } from "src/components/loader/Loader";
const Sections = lazy(() => import("./components/sections/Sections"));

export type Section = {
  id: "home" | "about" | "skills" | "contact";
};

type SectionResponse = {
  sections: Section[];
};

const App = (): React.JSX.Element => {
  const service = useFetchData<SectionResponse>("sections.json");
  return (
    <div className={"App"}>
      <ServiceData service={service} Renderer={Renderer} />
    </div>
  );
};

// eslint-disable-next-line react/no-multi-comp
const Renderer = ({ data }: DataProps<SectionResponse>): React.JSX.Element => {
  const { sections } = data;
  const sectionRefs = useRefs(sections);
  return (
    <div>
      <Header sectionRefs={sectionRefs} sections={sections} />
      <Suspense fallback={<Loader size={"medium"} />}>
        <MouseTrackerBackground>
          <Sections sectionRefs={sectionRefs} sections={sections} />
        </MouseTrackerBackground>
      </Suspense>
    </div>
  );
};

export default App;
