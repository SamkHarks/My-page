import { ServiceData } from "src/common/components/serviceData/ServiceData";
import { Content } from "src/common/components/documentViewer/Content";
import { useCheckLink } from "src/common/components/documentViewer/hooks";
import { DefaultFallback as LoadingFallback } from "src/common/components/boundaries/loadingBoundary/DefaultFallback";

type Props = {
  src: string;
}

const DocumentViewer = (props: Props): React.JSX.Element => {
  const services = useCheckLink(props.src);
  return (
    <ServiceData
      Renderer={Content}
      service={services.service}
      LoadingFallback={<LoadingFallback />}
      refetch={services.callService}
    />
  );
};

export default DocumentViewer;