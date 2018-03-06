import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const rootApp = document.getElementById('root');
const optionsApp = document.getElementById('options-root');

if (rootApp) {
  import('./App').then(({ App }) =>
    ReactDOM.render(<App />, rootApp));
} else if (optionsApp) {
  import('./Options').then(({ Options }) =>
    ReactDOM.render(<Options />, optionsApp));
}

registerServiceWorker();
