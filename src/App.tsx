import React from "react";
import "./App.css";
import { useFetchData, useRefs } from "./hooks/hooks";
import { Header } from "./components/header/Header";
import { Sections } from "./components/sections/Sections";
import { DataProps, ServiceData } from "./components/serviceData/ServiceData";

export type Section = {
  id: "home" | "about" | "skills" | "contact";
};

type SectionResponse = {
  sections: Section[];
};

export const SectionContext = React.createContext<{
  sections: SectionResponse["sections"];
}>({
  sections: [],
});

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
    <>
      <Header sectionRefs={sectionRefs} sections={sections} />
      <Sections sectionRefs={sectionRefs} sections={sections} />
    </>
  );
};

export default App;
