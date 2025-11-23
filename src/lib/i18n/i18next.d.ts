import 'i18next';
import type Resources from 'public/locales/resources'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources;
  }
}