import * as React from 'react'
import GoogleButton from 'react-google-button'
import { withStyles } from '@material-ui/core'

const styles: any = (theme: any): any => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  }
})

interface LoginFormProps {
  onLogin: () => void,
  classes: any
}

const LoginForm: React.SFC<LoginFormProps> = (props: LoginFormProps) => {
  const { classes } = props
  return (
    <div className={classes.container}>
      <GoogleButton
        onClick={() => { props.onLogin() }}
      />
    </div>
  )
}

export default withStyles(styles)(LoginForm)
