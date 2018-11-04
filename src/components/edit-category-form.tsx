import * as React from "react"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Chip from "@material-ui/core/Chip"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { Category, Option } from '../models'

const styles: any = theme => ({
  root: {
    height: 480,
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1
  },
  chipsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
})

interface EditCategoryFormStateProps {
  onSubmit: (category: Category) => void
  onClose: () => void
  classes: any
  isOpen: boolean
}

interface EditCategoryFormState {
  category: Category
  editingOptionName: string
}

class EditCategoryForm extends React.Component<
  EditCategoryFormStateProps,
  EditCategoryFormState
> {
  constructor(props: any) {
    super(props)

    this.state = this.getInitState()
  }

  getInitState(): EditCategoryFormState {
    return {
      editingOptionName: "",
      category: new Category("")
    }
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.category)
    this.onClose()
  }

  onClose = () => {
    this.props.onClose()
    this.setState(this.getInitState())
  }

  onNameChange = (name: string) => {
    this.setState({
      category: {
        ...this.state.category,
        name
      }
    })
  }

  onOptionChange = (name: string) => {
    this.setState({
      editingOptionName: name
    })
  }

  onAddOption = () => {
    const name = this.state.editingOptionName
    if (!name) return
    this.setState({
      category: {
        ...this.state.category,
        options: [...this.state.category.options, new Option(name)]
      },
      editingOptionName: ""
    })
  }

  onKeyPress(e) {
    if (e.keyCode === 13) {
      // Enter key
      this.onAddOption()
      e.preventDefault()
    }
  }

  render() {
    const { classes, isOpen } = this.props
    const { editingOptionName, category } = this.state
    const { options, name } = category
    return (
      <Dialog
        disableBackdropClick
        open={isOpen}
        onClose={() => this.onClose()}
        aria-labelledby="form-dialog-category"
        classes={{
          root: classes.root
        }}
      >
        <DialogTitle id="form-dialog-title">Нова категорія</DialogTitle>
        <DialogContent
          className={classes.content}>
          <TextField
            id="name"
            label="Назва категорії"
            value={name}
            onChange={e => this.onNameChange(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            id="options"
            label="Варіант"
            value={editingOptionName}
            onChange={e => this.onOptionChange(e.target.value)}
            onKeyDown={e => this.onKeyPress(e)}
            margin="dense"
            fullWidth
            helperText="Натисни Enter щоб додати введений варіант"
          />
          <div className={classes.chipsContainer}>
          {
            options.map((option: Option, index: number) => (
              <Chip
                className={classes.chip}
                label={option.name}
                onDelete={() => {}}
                key={index} />
            ))
          }
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.onClose()}>Відмінити</Button>
          <Button onClick={() => this.onSubmit()} color="primary">
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(EditCategoryForm)
