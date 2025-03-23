import { ServiceData } from "src/components/serviceData/ServiceData";
import { Content } from "src/components/documentViewer/Content";
import { useCheckLink } from "src/components/documentViewer/hooks";

type Props = {
  src: string;
}

const DocumentViewer = (props: Props): React.JSX.Element => {
  const services = useCheckLink(props.src);
  return (
    <ServiceData
      Renderer={Content}
      service={services.service}
      refetch={services.refetch}
    />
  );
};

export default DocumentViewer;