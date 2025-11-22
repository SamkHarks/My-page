import { DataProps } from "src/common/components/serviceData/ServiceData";
import * as styles from "src/common/components/documentViewer/components/Content.module.css";

type Props = DataProps<string>;

export const Content = (props: Props): React.JSX.Element => (
  <div className={styles.container}>
    <iframe
      className={styles.iframe}
      src={props.data}
      width={'100%'}
      height={'100%'}
      allowFullScreen={true}
    />
  </div>
);