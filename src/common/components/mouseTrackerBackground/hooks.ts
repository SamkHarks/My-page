import { useEffect, useState } from "react";


export const useTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(!!((navigator.maxTouchPoints || 'ontouchstart' in document.documentElement)));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsTouchDevice(event.matches);
    };

    setIsTouchDevice(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return isTouchDevice;
};