import { create } from 'zustand';
import { IconBaseProps } from 'react-icons';

// Define the base modal configuration
type BaseModalConfig = {
  isOpen: boolean;
  content: React.ReactNode | null;
  isLoading: boolean;
  onClose?: () => void;
  title?: string;
};

type ModalWithIconButton = BaseModalConfig & {
  IconButton: React.ComponentType<IconBaseProps>;
  iconButtonProps?: IconBaseProps;
};

type ModalWithoutIconButton = BaseModalConfig & {
  IconButton?: never;
  iconButtonProps?: never;
};

export type OpenModalConfig = Omit<ModalWithIconButton, 'isOpen' | 'isLoading'> | Omit<ModalWithoutIconButton, 'isOpen' | 'isLoading'>;

// Create a union type for the modal store
type ModalStore = (ModalWithIconButton | ModalWithoutIconButton) & {
  openModal: (config: OpenModalConfig) => void;
  closeModal: () => void;
  setLoading: (loading: boolean) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,
  onClose: undefined,
  IconButton: undefined,
  iconButtonProps: undefined,
  title: undefined,
  isLoading: false,
  openModal: (config) => set({ isOpen: true, ...config }),
  closeModal: () =>
    set({
      isOpen: false,
      content: null,
      onClose: undefined,
      IconButton: undefined,
      title: undefined,
      isLoading: false,
    }),
    setLoading: (loading) => set((state) => {
      if (state.isLoading !== loading) {
        return { isLoading: loading };
      }
      return state;
    }),
}));