import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { App } from './client';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
