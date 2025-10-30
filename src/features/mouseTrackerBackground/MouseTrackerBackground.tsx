import { useState } from "react";
import * as styles from "src/features/mouseTrackerBackground/mouseTrackerBackground.module.css";
import { useTouchDevice } from "src/features/mouseTrackerBackground/hooks";

const GRADIENT_SIZE = 450;

export const MouseTrackerBackground = ({ children }: React.PropsWithChildren): React.JSX.Element => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const isTouchDevice = useTouchDevice();
  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMouse({ x: clientX - left, y: clientY - top });
  };
  // Generate the mask image style
  const maskImage = isTouchDevice
    ? `linear-gradient(rgba(0,0,80,0.45), rgba(0,0,80,0.45))`
    : `radial-gradient(${GRADIENT_SIZE}px at ${mouse.x}px ${mouse.y}px, rgba(0,0,80,0.3) , rgba(0,0,80,0.45) )`;
  const style = {
    backgroundImage: maskImage,
    WebkitMaskImage: maskImage, // For Safari compatibility
  };

  return (
    <main onMouseMove={onMouseMove} className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.gradient} style={style} />
        <div className={styles.overlay} style={style} />
      </div>
      {children}
    </main>
  );
};
