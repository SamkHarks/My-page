import { useEffect, useRef, useState } from 'react';
import { useModalStore } from 'src/stores/useModalStore';
import * as styles from 'src/components/modal/Modal.module.css';
import { IoCloseOutline } from "react-icons/io5";
import { Boundaries } from 'src/components/boundaries/Boundaries';
import { BasicFallback } from 'src/components/boundaries/errorBoundary/BasicFallback';

export const Modal = (): React.JSX.Element | null => {
  const { isOpen, content, onClose, closeModal, title, IconButton, iconButtonProps, isLoading  } = useModalStore();
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
    if (isLoading) return;
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
      role={'dialog'}
      aria-modal={true}
      aria-labelledby={'modal-title'}
      onClick={handleClose}
    >
      <div
        className={`${styles.content_container} ${isVisible ? styles.active : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header_container}>
          {title ? <h2 id={'modal-title'} className={styles.header_title}>{title}</h2> : <div />}
          <div className={styles.button_container}>
            {IconButton && <IconButton className={styles.icon} {...iconButtonProps} />}
            <IoCloseOutline
              className={styles.icon}
              size={25}
              onClick={handleClose}
            />
          </div>
        </header>
        <Boundaries
          ErrorFallback={
            (props) => (
              <BasicFallback
                variant={'default'}
                size={24}
                color={'black'}
                {...props} 
              />
          )}
        >
          {content}
        </Boundaries>
      </div>
    </div>

  );
}
