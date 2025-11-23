import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useConfiguration } from 'src/common/hooks/useConfiguration';
import { useModalStore } from 'src/stores/useModalStore';
import { useNotificationStore } from 'src/stores/useNotificationStore';
import { FormData } from 'src/features/contact/components/contactForm/types';
import { useTranslation } from 'react-i18next';
import { apiClient } from 'src/common/api/http/clients';

type EmailResponse = {
  message: string;
};

export const useEmailService = (): {
  sendEmail: (formData: FormData) => void;
  sendEmailAsync: (formData: FormData) => Promise<EmailResponse>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: EmailResponse | undefined;
  error: Error | null;
  reset: () => void;
} => {
  const { t } = useTranslation('contact');
  const addNotification = useNotificationStore((state) => state.addNotification);
  const setLoading = useModalStore((state) => state.setLoading);
  const { paths } = useConfiguration();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post<EmailResponse>(
        paths.email.contact,
        formData
      );
      return response.body;
    },
    onSuccess: () => {
      addNotification(t('form.success.message'), 'success', { dismissAfter: 5000 });
    },
    onError: () => {
      addNotification(t('form.failure.message'), 'error', { 
        onDissmiss: () => mutation.reset(),
        dismissAfter: 8000 
      });
    },
  });

  useEffect(() => {
    setLoading(mutation.isPending);
  }, [mutation.isPending, setLoading]);

  return {
    sendEmail: mutation.mutate,
    sendEmailAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
    error: mutation.error,
    reset: mutation.reset,
  };
};