import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto'

import Main from './containers/Main'
import { AuthGuard } from './containers/AuthGuard'


const root = document.getElementById('root');

ReactDOM.render(<AuthGuard><Main/></AuthGuard>, root);

if (module.hot) {
    module.hot.accept();
}
