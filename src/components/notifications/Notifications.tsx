import { useNotificationStore } from 'src/stores/useNotificationStore';
import * as styles from 'src/components/notifications/Notifications.module.css';
import { IoCloseOutline } from "react-icons/io5";

export const Notifications = (): React.JSX.Element | null => {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className={styles.notificationContainer}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          role={notification.type === 'error' ? 'alert' : 'status'}
          className={`${styles.notification} ${styles[notification.type]}`}
        >
          {notification.message}
          <IoCloseOutline
            className={styles.closeIcon}
            size={30}
            onClick={() => removeNotification(notification.id)}
            aria-label={'Close notification'}
          />
        </div>
      ))}
    </div>
  );
};