import { useSuspenseQuery } from "@tanstack/react-query";
import { HandledError } from "src/common/components/boundaries/errorBoundary/HandledError";
import * as styles from "src/common/components/documentViewer/DocumentViewer.module.css";

type Props = {
  src: string;
}

const DocumentViewer = (props: Props): React.JSX.Element => {
  const { data } = useSuspenseQuery({
    queryKey: ['pdf-link', props.src],
    queryFn: async () => {
      const response = await fetch(props.src, { method: 'HEAD' });
      if (!response.ok) {
        throw new HandledError(`${response.status}`);
      }
      return props.src;
    },
    staleTime: Infinity,
  });

  return (
    <div className={styles.container}>
      <iframe
        className={styles.iframe}
        src={data}
        width={'100%'}
        height={'100%'}
        allowFullScreen={true}
      />
    </div>
  )
};

export default DocumentViewer;