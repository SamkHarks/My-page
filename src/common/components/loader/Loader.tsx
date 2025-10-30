import { Spinner } from "src/common/components/spinner/Spinner";
import { Animation } from "src/common/components/animation/Animation";
import * as styles from "src/common/components/loader/Loader.module.css";

type Props = {
    size: "small" | "medium" | "large";
};

export const Loader = ({ size }: Props): React.JSX.Element => (
  <div className={styles.container}>
    <Animation
      type={"zigzag"}
      numVertices={30}
      width={window.innerWidth}
      height={window.innerHeight}
      allowDynamic={false}
    />
    <div className={styles.spinner_container}>
      <Spinner size={size} />
    </div>
  </div>
);