module.exports = {
  defaultNamespace: 'common',
  defaultValue: '__UNTRANSLATED__',
  locales: ['en', 'fi'],
  input: ['./src/**/!(*.test).{ts,tsx}'],
  output: './public/locales/$LOCALE/$NAMESPACE.json',
  keepRemoved: false,
  createOldCatalogs: false,
  sort: true,
  failOnWarnings: true,
}