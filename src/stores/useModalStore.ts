import { create } from 'zustand';
import { IconBaseProps } from 'react-icons';

// Define the base modal configuration
type BaseModalConfig = {
  isOpen: boolean;
  content: React.ReactNode | null;
  isLoading: boolean;
  isPreloading: boolean;
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

export type OpenModalConfig = Omit<ModalWithIconButton, 'isOpen' | 'isLoading' | 'isPreloading'> | Omit<ModalWithoutIconButton, 'isOpen' | 'isLoading' | 'isPreloading'>;

// Create a union type for the modal store
type ModalStore = (ModalWithIconButton | ModalWithoutIconButton) & {
  openModal: (config: OpenModalConfig) => void;
  closeModal: () => void;
  setLoading: (loading: boolean) => void;
  setPreloading: (preloading: boolean) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,
  onClose: undefined,
  IconButton: undefined,
  iconButtonProps: undefined,
  title: undefined,
  isLoading: false,
  isPreloading: false,
  openModal: (config) => set({ isOpen: true, ...config }),
  closeModal: () =>
    set({
      isOpen: false,
      content: null,
      onClose: undefined,
      IconButton: undefined,
      title: undefined,
      isLoading: false,
      isPreloading: false,
    }),
  setLoading: (loading) => set((state) => {
    if (state.isLoading !== loading) {
      return { isLoading: loading };
    }
    return state;
  }),
  setPreloading: (preloading) => set((state) => {
    if (state.isPreloading !== preloading) {
      return{ isPreloading: preloading };
    }
    return state;
  })
}));