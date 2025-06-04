// eslint-disable-next-line no-undef
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow dynamic translation keys in t() calls',
    },
    messages: {
      dynamicKey: 'Translation key in t() must be a static string literal.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;
        const args = node.arguments;

        // Check for t(...) calls
        const isTCall = callee.type === 'Identifier' && callee.name === 't';
        if (!isTCall || args.length === 0) return;

        const keyArg = args[0];

        // If not a string literal, report it
        if (keyArg.type !== 'Literal' || typeof keyArg.value !== 'string') {
          context.report({
            node: keyArg,
            messageId: 'dynamicKey',
          });
        }
      },
    };
  },
};
