import { create } from 'zustand';
import { IconBaseProps } from 'react-icons';

// Define the base modal configuration
type BaseModalConfig = {
  isOpen: boolean;
  content: React.ReactNode | null;
  onClose?: () => void;
  title?: string;
};

type ModalWithIconButton = BaseModalConfig & {
  IconButton: React.ComponentType<IconBaseProps>;
  iconButtonProps: IconBaseProps;
};

type ModalWithoutIconButton = BaseModalConfig & {
  IconButton: undefined;
  iconButtonProps: undefined;
};

// Create a union type for the modal store
type ModalStore = (ModalWithIconButton | ModalWithoutIconButton) & {
  openModal: (config: Omit<ModalWithIconButton, 'isOpen'> | Omit<ModalWithoutIconButton, 'isOpen'>) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,
  onClose: undefined,
  IconButton: undefined,
  iconButtonProps: undefined,
  title: undefined,
  openModal: (config) => set({ isOpen: true, ...config }),
  closeModal: () =>
    set({
      isOpen: false,
      content: null,
      onClose: undefined,
      IconButton: undefined,
      title: undefined,
    }),
}));