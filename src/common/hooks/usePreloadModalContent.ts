import { useState } from "react";
import { OpenModalConfig, useModalStore } from "src/stores/useModalStore";


export const usePreloadModalContent = (): (modalConfig: OpenModalConfig) => void => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  const openModal = useModalStore((state) => state.openModal);
  const setPreloading = useModalStore((state) => state.setPreloading);

  return (modalConfig: OpenModalConfig) => {
      setPreloading(!isPreloaded);
      openModal(modalConfig);
      setIsPreloaded(true);
  }
}