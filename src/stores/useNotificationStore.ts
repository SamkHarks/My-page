import { create } from 'zustand';

type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error';
  onDissmiss?: () => void;
  timeoutId?: NodeJS.Timeout;
};

type DismissOptions = {
  dismissAfter?: number,
  onDissmiss?: () => void
};


type NotificationStore = {
  notifications: Notification[];
  addNotification: (
    message: string,
    type: 'success' | 'error',
    options?: DismissOptions,
  ) => void;
  removeNotification: (id: string) => void;
};


export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (message, type, options) => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (options?.dismissAfter) {
      timeoutId = setTimeout(() => {
        options?.onDissmiss?.();
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, options.dismissAfter);
    }

    const id = Math.random().toString(36).slice(2, 11); // Generate a unique ID
    set((state) => ({
      notifications: [...state.notifications, { id, message, type, timeoutId, ...(options?.onDissmiss && {onDissmiss: options.onDissmiss}) }],
    }));
  },
  removeNotification: (id) => {
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);
      if (notification?.timeoutId) {
        clearTimeout(notification.timeoutId);
      }
      notification?.onDissmiss?.();
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
    }});
  },
}));