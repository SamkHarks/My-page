import { Suspense, useEffect, useRef } from 'react';
import { useModalStore } from 'src/stores/useModalStore';
import { Spinner } from 'src/components/spinner/Spinner';
import * as styles from 'src/components/modal/Modal.module.css';

export const Modal = (): React.JSX.Element | null => {
  const { isOpen, content, onClose, onPress, buttonTitle, closeModal } = useModalStore();
  const documentRef = useRef(document);
  useEffect(() => {
    const currentDocument = documentRef.current;
    currentDocument.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      currentDocument.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    closeModal(); // Reset all modal state
  };

  return (
    <div
      className={styles.background_container}
      onClick={handleClose}
    >
      <div
        className={styles.content_container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.button_container}>
          {onPress ? <button onClick={onPress}>{buttonTitle}</button> : <div />}
          <button onClick={handleClose}>Close</button>
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
