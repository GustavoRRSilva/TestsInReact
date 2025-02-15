module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import'],
  rules: {
    'react/prop-types': 'off', // Se você não usa prop-types (pode ser desligado se você usar TypeScript)
    'react/react-in-jsx-scope': 'off', // No React 17, não é necessário importar React para JSX
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Avisar sobre variáveis não usadas, mas permitir parâmetros com _
    'react/jsx-uses-react': 'off', // Não é necessário no React 17
    'react/jsx-uses-vars': 'error', // Garante que as variáveis JSX sejam usadas corretamente
    'no-console': 'warn', // Avisar sobre o uso de console.log
    'react/jsx-no-target-blank': 'warn', // Avisar sobre links com `target="_blank"` sem `rel="noopener noreferrer"`
  },
  settings: {
    react: {
      version: 'detect', // Detecta a versão do React automaticamente
    },
  },
};
