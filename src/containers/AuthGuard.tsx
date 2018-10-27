import * as React from 'react'
import { observer } from 'mobx-react'

import AuthContext from '../contexts/auth-context'
import { LoginForm } from '../components/login-form'

interface AuthGuardProps {
  children: any
}

@observer
export class AuthGuard extends React.Component<AuthGuardProps> {
  render () {
    return (
      AuthContext.isLoggedIn ? this.props.children : <LoginForm onLogin={() => AuthContext.authentificate()}/>
    )
  }
}
