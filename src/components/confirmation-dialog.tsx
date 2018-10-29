import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography'

interface ConfirmationDialogProps {
  onCancel: () => void
  onSubmit: () => void
  classes: any
  title: string
  message: string
  open: boolean
}
const styles: any = theme => ({ })

const ConfirmationDialog: React.SFC<ConfirmationDialogProps> = (props: ConfirmationDialogProps) => {
  const { onCancel, onSubmit, title, message, open } = props

  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
    >
      <DialogTitle id="confirmation-dialog-title">
        { title }
      </DialogTitle>
      <DialogContent>
        <Typography>
          { message }
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onCancel()} color="primary">
          Ні
        </Button>
        <Button onClick={() => onSubmit()} color="primary">
          Так
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(ConfirmationDialog)
