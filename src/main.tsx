import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reset from './shared/styles/reset.ts';
import { Global, ThemeProvider } from '@emotion/react';
import { THEME } from './shared/styles/global.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global styles={reset} />
    <ThemeProvider theme={THEME}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
