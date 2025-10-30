import { useEffect, useMemo } from 'react';
import { useConfiguration, useService } from 'src/hooks/hooks';
import { useModalStore } from 'src/stores/useModalStore';
import { useNotificationStore } from 'src/stores/useNotificationStore';
import { Service } from 'src/components/serviceData/types';
import { FormData } from 'src/features/contact/components/contactForm/types';
import { useTranslation } from 'react-i18next';

type EmailResponse = {
  message: string;
}

export const useEmailService = (formData: FormData | null): {
  service: Service<EmailResponse>;
  callService: () => Promise<void>;
  clearService: () => void;
} => {
  const { t } = useTranslation('contact');
  const addNotification = useNotificationStore((state) => state.addNotification);
  const setLoading = useModalStore(state => state.setLoading);
  const {baseUrls, paths} = useConfiguration();

  const urlOptions = { baseUrl: baseUrls.baseUrl, path: paths.email.contact };
  const serviceOptions = useMemo(() => ({ immediate: false }), []);
  const requestOptions = useMemo(() => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    ...(formData && { body: formData }),
  } as const), [formData]);
  
  const email = useService<{message: string}>({
    urlOptions,
    requestOptions,
    serviceOptions
  });

  useEffect(() => {
    setLoading(email.service.state === 'LOADING');
    if (email.service.state === 'SUCCESS') {
      addNotification(t('form.success.message'), 'success', { dismissAfter: 5000 });
    } else if (email.service.state === 'FAILURE') {
      addNotification(t('form.failure.message'), 'error', { onDissmiss: () => email.clearService(), dismissAfter: 8000});
    }

  }, [email, setLoading, addNotification, t]);

  return email;
}