import { DataProps } from "src/components/serviceData/ServiceData";
import * as styles from "src/components/documentViewer/Content.module.css";

type Props = DataProps<string>;

export const Content = (props: Props): React.JSX.Element => (
  <div className={styles.container}>
    <iframe
      className={styles.iframe}
      src={props.data}
      width={'100%'}
      height={'100%'}
    />
  </div>
);