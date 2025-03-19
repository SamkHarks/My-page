import { Suspense, useEffect, useRef, useState } from 'react';
import { useModalStore } from 'src/stores/useModalStore';
import { Spinner } from 'src/components/spinner/Spinner';
import * as styles from 'src/components/modal/Modal.module.css';
import { IoCloseOutline } from "react-icons/io5";

export const Modal = (): React.JSX.Element | null => {
  const { isOpen, content, onClose, closeModal, title, IconButton, iconButtonProps  } = useModalStore();
  const [isVisible, setIsVisible] = useState(false);

  const documentRef = useRef(document);
  useEffect(() => {
    const currentDocument = documentRef.current;
    currentDocument.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    return () => {
      currentDocument.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 0);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
      closeModal();
    }, 500);
  };

  return (
    <div
      className={styles.background_container}
      onClick={handleClose}
    >
      <div
        className={`${styles.content_container} ${isVisible ? styles.active : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header_container}>
          {title ? <h5>{title}</h5> : <div />}
          <div className={styles.button_container}>
            {IconButton && <IconButton className={styles.icon} {...iconButtonProps} />}
            <IoCloseOutline
              className={styles.icon}
              size={25}
              onClick={handleClose}
            />
          </div>
        </div>
        <Suspense fallback={
          <div className={styles.loading_container}>
            <Spinner size={"medium"}/>
          </ div>
        }>
          {content}
        </Suspense>
      </div>
    </div>

  );
}
