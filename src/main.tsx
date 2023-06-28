import * as React from 'react'
import { createRoot } from 'react-dom/client'
import 'typeface-roboto'

import Main from './containers/Main'
import { AuthGuard } from './containers/AuthGuard'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<AuthGuard><Main/></AuthGuard>)

if (module.hot) {
  module.hot.accept()
}
