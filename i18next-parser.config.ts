module.exports = {
  defaultNamespace: 'common',
  defaultValue: '__UNTRANSLATED__',
  locales: ['en', 'fi'],
  input: ['./src/**/!(*.test).{ts,tsx}'],
  output: './src/locales/$LOCALE/$NAMESPACE.json',
  keepRemoved: false,
  createOldCatalogs: false,
  sort: true,
  failOnWarnings: true,
}