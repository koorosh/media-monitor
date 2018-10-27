import * as React from "react"
import { withStyles } from "@material-ui/core/styles"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import { Project } from '../models'

const styles = theme => ({
  addCategoryDialog: {
    root: {
      minWidth: 300,
      maxWidth: 400
    }
  },
  root: {},
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3
  }
})

export interface ProjectsListProps {
  items: any[]
  classes: any
  onRemove: (projectId: string) => void
  onEdit: (projectId: string) => void
}

class ProjectsList extends React.Component<ProjectsListProps, any> {

  static defaultProps = {
    items: []
  }

  render() {
    const { classes, items, onRemove, onEdit } = this.props

    const Projects = items.map((project: Project, index) => {
      return (
        <ListItem key={index}>
          <ListItemText primary={project.name} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Edit"
              onClick={() => onEdit(project.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete"
              onClick={() => onRemove(project.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    })

    return (
      <div>
        <List>{Projects}</List>
      </div>
    )
  }
}

export default withStyles(styles)(ProjectsList)
