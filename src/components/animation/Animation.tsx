import * as styles from "src/components/animation/Animation.module.css";
import { Props } from "src/components/animation/types";
import { useWebGL } from "src/components/animation/hooks";
import { useRef } from "react";


const Animation = (props: Props): React.JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useWebGL(props, canvasRef);
  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.height}
      className={styles.background}
    />
  );
};

export { Animation };