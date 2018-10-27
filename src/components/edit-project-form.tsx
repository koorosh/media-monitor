import * as React from "react"
import * as _ from "lodash"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import FolderIcon from "@material-ui/icons/Folder"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"

import EditCategoryForm from "./edit-category-form"
import { Category, Project } from '../models'

const styles = theme => ({
  addCategoryDialog: {
    root: {
      minWidth: 300,
      maxWidth: 400
    }
  },
  button: {
    marginLeft: "auto"
  }
})

interface EditProjectFormProps {
  initProject: Project
  onSubmit: (project: Project) => void
  onClose: () => void
  classes: any
}

interface EditProjectFormState {
  project: Project
  isNewCategoryModalOpen: boolean
}

class EditProjectForm extends React.Component<
  EditProjectFormProps,
  EditProjectFormState
> {
  constructor(props: EditProjectFormProps) {
    super(props)
    const projectName = "some name"
    const categories: Category[] = []

    this.state = {
      isNewCategoryModalOpen: false,
      project: _.cloneDeep(props.initProject || new Project())
    }
  }

  handleProjectNameChange = (name: string) => {
    this.setState({
      project: _.assign(new Project(), this.state.project, { name })
    })
  }

  handleOpenNewCategoryModal = () => {
    this.setState({ isNewCategoryModalOpen: true })
  }

  handleCloseNewCategoryModal = () => {
    this.setState({ isNewCategoryModalOpen: false })
  }

  handleSubmitNewCategory = (category: Category) => {
    this.setState({
      project: {
        ...this.state.project,
        categories: [...this.state.project.categories, category]
      }
    })
  }

  handleSave = () => {
    this.props.onSubmit(this.state.project)
  }

  closeEditForm = () => {
    this.props.onClose()
  }

  removeCategory = (categoryId: string) => {
    const categories = this.state.project.categories.filter(
      category => category.id !== categoryId
    )
    this.setState({
      project: _.assign(new Project(), this.state.project, { categories })
    })
  }

  render() {
    const { classes } = this.props
    const { project, isNewCategoryModalOpen } = this.state

    const Categories = project.categories.map((category, index) => (
      <ListItem key={index}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={category.name}
          secondary={category.options.map(option => option.name).join(", ")}
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={() => this.removeCategory(category.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))

    return (
      <React.Fragment>
        <CardContent>
          <div>
            <TextField
              id="name"
              label="Назва проету"
              value={project.name}
              onChange={e => this.handleProjectNameChange(e.target.value)}
              margin="dense"
              fullWidth
            />
            <br />

            <List dense>{Categories}</List>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={this.handleOpenNewCategoryModal}
              >
                Додати категорію
              </Button>
            </CardActions>

            <EditCategoryForm
              isOpen={isNewCategoryModalOpen}
              onSubmit={this.handleSubmitNewCategory}
              onClose={this.handleCloseNewCategoryModal}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={() => this.closeEditForm()}>Відмінити</Button>
          <Button onClick={() => this.handleSave()} color="primary">
            Зберегти
          </Button>
        </CardActions>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(EditProjectForm)
