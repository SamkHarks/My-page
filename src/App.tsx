import React, { Suspense } from "react";
import "./App.css";
import { useFetchData, useRefs } from "./hooks/hooks";
import { Header } from "./components/header/Header";
import { DataProps, ServiceData } from "./components/serviceData/ServiceData";
import { Spinner } from "./components/spinner/Spinner";
import { MouseTrackerBackground } from "./components/mouseTrackerBackground/MouseTrackerBackground";
const Sections = React.lazy(() => import("./components/sections/Sections"));

export type Section = {
  id: "home" | "about" | "skills" | "contact";
};

type SectionResponse = {
  sections: Section[];
};

const App = () => {
  const service = useFetchData<SectionResponse>("sections.json");
  return (
    <div className="App">
      <ServiceData service={service} Renderer={Renderer} />
    </div>
  );
};

const Renderer = ({ data }: DataProps<SectionResponse>) => {
  const { sections } = data;
  const sectionRefs = useRefs(sections);
  return (
    <div>
      <Header sectionRefs={sectionRefs} sections={sections} />
      <Suspense fallback={<Spinner size={"medium"} />}>
        <MouseTrackerBackground>
          <Sections sectionRefs={sectionRefs} sections={sections} />
        </MouseTrackerBackground>
      </Suspense>
    </div>
  );
};

export default App;
