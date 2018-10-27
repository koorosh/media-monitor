import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'typeface-roboto'
import Options from './containers/Options'
import { AuthGuard } from './containers/AuthGuard'

const root = document.getElementById('root')

ReactDOM.render(
  <AuthGuard>
    <Options />
  </AuthGuard>, root)

if (module.hot) {
  module.hot.accept();
}
