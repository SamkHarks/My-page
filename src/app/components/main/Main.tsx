import { lazy } from "react";
import { SectionResponse } from "src/common/types/sections/types";
import { useSectionRefs } from "src/app/components/sections/hooks/useSectionRefs";
import { Header } from "src/common/components/header/Header";
import { Loader } from "src/common/components/loader/Loader";
import { MouseTrackerBackground } from "src/common/components/mouseTrackerBackground/MouseTrackerBackground";
import { Boundaries } from "src/common/components/boundaries/Boundaries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { publicClient } from "src/common/api/http/clients";
import { getConfiguration } from "src/config/utils";

const Sections = lazy(() => import("../sections/Sections"));

export const Main = (): React.JSX.Element => {
  const { paths } = getConfiguration();
  const { data } = useSuspenseQuery({
    queryKey: ['sections'],
    queryFn: () => publicClient.get<SectionResponse>(paths.data.sections).then(res => res.body),
    staleTime: Infinity,
  });
  const sectionRefs = useSectionRefs(data.sections);
  return (
    <>
      <Header sectionRefs={sectionRefs} sections={data.sections} />
      <Boundaries
        LoadingFallback={<Loader size={"medium"} />}
      >
        <MouseTrackerBackground>
          <Sections sectionRefs={sectionRefs} sections={data.sections} />
        </MouseTrackerBackground>
      </Boundaries>
    </>
  );
};