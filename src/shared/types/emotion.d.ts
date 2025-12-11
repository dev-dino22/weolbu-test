import '@emotion/react';
import { CustomTheme } from '@styles/global';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Theme extends CustomTheme {}
}
