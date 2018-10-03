import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto'

import Main from './containers/Main'
// import {Auth} from "./core/auth";
// import {configureAxios} from "./core/request";
// import {App} from './App';


const root = document.getElementById('root');

ReactDOM.render(<Main/>, root);

if (module.hot) {
    module.hot.accept();
}
