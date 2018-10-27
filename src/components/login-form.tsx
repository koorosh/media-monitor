import * as React from 'react'

interface LoginFormProps {
  onLogin: () => void
}

export const LoginForm: React.SFC<LoginFormProps> = (props: LoginFormProps) => {
  return (
    <div>
    <div>
      Please, login with your Google Account
    </div>
      <button onClick={props.onLogin}>Login</button>
    </div>
  )
}
