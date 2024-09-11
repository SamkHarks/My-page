import React from "react";
import styles from "./mouseTrackerBackground.module.css";
import { useTouchDevice } from "../../hooks/hooks";

const GRADIENT_SIZE = 450;

export const MouseTrackerBackground = ({ children }: React.PropsWithChildren) => {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const isTouchDevice = useTouchDevice();
  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMouse({ x: clientX - left, y: clientY - top });
  }
  // Generate the mask image style
  const maskImage = isTouchDevice
    ? `linear-gradient(rgba(0,0,80,0.45), rgba(0,0,80,0.45))`
    : `radial-gradient(${GRADIENT_SIZE}px at ${mouse.x}px ${mouse.y}px, rgba(0,0,80,0.3) , rgba(0,0,80,0.45) )`;
  const style = {
    backgroundImage: maskImage,
    WebkitMaskImage: maskImage, // For Safari compatibility
  };

  return (
    <div onMouseMove={onMouseMove} className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.gradient} style={style} />
        <div className={styles.overlay} style={style} />
      </div>
      {children}
    </div>
  );
};
