import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'typeface-roboto'
import Options from './containers/Options'

const root = document.getElementById('root')

ReactDOM.render(<Options />, root)

if (module.hot) {
  module.hot.accept();
}
