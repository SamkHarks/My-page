import { Spinner } from "src/components/spinner/Spinner";
import { Animation } from "src/components/animation/Animation";
import * as styles from "src/components/loader/Loader.module.css";

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
    <Spinner size={size} />
  </div>
);