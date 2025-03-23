import { ServiceData } from "src/components/serviceData/ServiceData";
import { Content } from "src/components/documentViewer/Content";
import { useCheckLink } from "src/components/documentViewer/hooks";
import { DefaultFallback as LoadingFallback } from "src/components/boundaries/loadingBoundary/DefaultFallback";

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
      refetch={services.refetch}
    />
  );
};

export default DocumentViewer;