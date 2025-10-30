import { lazy } from "react";
import { DataProps } from "src/common/components/serviceData/ServiceData";
import { SectionResponse } from "src/common/types/sections/types";
import { useRefs } from "src/common/hooks/useSectionRefs";
import { Header } from "src/app/header/Header";
import { Loader } from "src/common/components/loader/Loader";
import { MouseTrackerBackground } from "src/features/mouseTrackerBackground/MouseTrackerBackground";
import { Boundaries } from "src/common/components/boundaries/Boundaries";

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