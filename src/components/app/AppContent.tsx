import { lazy } from "react";
import { DataProps } from "src/components/serviceData/ServiceData";
import { SectionResponse } from "src/components/app/types";
import { useRefs } from "src/hooks/hooks";
import { Header } from "src/components/header/Header";
import { Loader } from "src/components/loader/Loader";
import { MouseTrackerBackground } from "src/components/mouseTrackerBackground/MouseTrackerBackground";
import { Boundaries } from "src/components/boundaries/Boundaries";

const Sections = lazy(() => import("../sections/Sections"));

export const AppContent = ({ data }: DataProps<SectionResponse>): React.JSX.Element => {
  const { sections } = data;
  const sectionRefs = useRefs(sections);
  return (
    <>
      <Header sectionRefs={sectionRefs} sections={sections} />
      <Boundaries
        LoadingFallback={<Loader size={"medium"} />}
      >
        <MouseTrackerBackground>
          <Sections sectionRefs={sectionRefs} sections={sections} />
        </MouseTrackerBackground>
      </Boundaries>
    </>
  );
};