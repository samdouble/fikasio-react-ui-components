import { cssCustomProperties } from '@fikasio/styles';

const marker = 'data-fikasio-react-ui-components-styles';

export function applyFikasioStyles(): void {
  if (typeof document === 'undefined') {
    return;
  }
  if (document.head.querySelector(`style[${marker}]`)) {
    return;
  }
  const themeStyle = document.createElement('style');
  themeStyle.setAttribute(marker, 'true');
  themeStyle.textContent = cssCustomProperties;
  document.head.appendChild(themeStyle);
}

applyFikasioStyles();
