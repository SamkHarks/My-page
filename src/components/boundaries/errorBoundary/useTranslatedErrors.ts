import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HandledError } from "src/components/boundaries/errorBoundary/HandledError";

/**
 * Custom hook to translate error messages based on error keys.
 * 
 * @returns A function that takes an optional HandledError and returns a translated error message.
 * 
 * Usage:
 * const getTranslatedError = useTranslatedErrors();
 * const errorMessage = getTranslatedError(error);
 * 
 * This hook uses the `useTranslation` hook from `react-i18next` to fetch translations
 * for common HTTP status codes and other error messages defined in the "errors" namespace.
 *
*/
export const useTranslatedErrors = (
): (error?: HandledError) => string => {
  const { t } = useTranslation('errors');

  const staticErrors = useMemo(
    () => ({
      '400': t('400'),
      '404': t('404'),
      '500': t('500'),
      '501': t('501'),
      '502': t('502'),
      '503': t('503'),
      '504': t('504'),
      '505': t('505'),
      'error': t('error'),
    }),
    [t]
  )

  return useCallback(
    (error?: HandledError) => {
      if (!error) return staticErrors.error;
      if (error.key in staticErrors) {
        return staticErrors[error.key as keyof typeof staticErrors];
      }
      // For dynamic error keys like "otherStatus"
      if (error.key === 'otherStatus' && isOtherStatusArgs(error.args)) {
        return t('otherStatus', error.args);
      }
      // Fallback
      return staticErrors.error;
    },
    [staticErrors, t]
  );
}

type OtherStatusArgs = { status: string | number };

const isOtherStatusArgs = (args: unknown): args is OtherStatusArgs => {
  return (
    typeof args === 'object' &&
    args !== null &&
    'status' in args &&
    (typeof args.status === 'string' || typeof args.status === 'number')
  );
}
