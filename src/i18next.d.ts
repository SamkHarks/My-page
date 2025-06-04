/* eslint-disable @typescript-eslint/consistent-type-definitions */
import 'i18next';
import type Resources from 'src/locales/resources'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources;
  }
}