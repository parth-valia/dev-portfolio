module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Prevent invalid HTML nesting that causes hydration errors
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['invalidHref', 'preferButton']
    }],
  },
  overrides: [
    {
      files: ['**/*.tsx', '**/*.ts'],
      rules: {
        // Custom rule to catch Card inside Link patterns
        'no-restricted-syntax': [
          'error',
          {
            selector: 'JSXElement[openingElement.name.name="Link"] JSXElement[openingElement.name.name="Card"]',
            message: 'Avoid wrapping Card components with Link. Use Link inside Card instead to prevent hydration errors.'
          }
        ]
      }
    }
  ]
};
