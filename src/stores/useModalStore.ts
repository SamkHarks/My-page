import { create } from 'zustand';

// Define the base modal configuration
type BaseModalConfig = {
  isOpen: boolean;
  content: React.ReactNode | null;
  onClose?: () => void;
};

// Define a type for modals WITH a button
type ModalWithButton = BaseModalConfig & {
  onPress: () => void;
  buttonTitle: string;
};

// Define a type for modals WITHOUT a button
type ModalWithoutButton = BaseModalConfig & {
  onPress?: never;
  buttonTitle?: never;
};

// Create a union type for the modal store
type ModalStore = (ModalWithButton | ModalWithoutButton) & {
  openModal: (config: Omit<ModalWithButton, 'isOpen'> | Omit<ModalWithoutButton, 'isOpen'>) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,
  onClose: undefined,
  onPress: undefined,
  buttonTitle: undefined,
  openModal: (config) => set({ isOpen: true, ...config }),
  closeModal: () =>
    set({
      isOpen: false,
      content: null,
      onClose: undefined,
      onPress: undefined,
      buttonTitle: undefined,
    }),
}));