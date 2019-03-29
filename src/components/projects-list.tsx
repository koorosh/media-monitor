import * as React from "react"
import { withStyles } from "@material-ui/core/styles"
import CheckCircle from "@material-ui/icons/CheckCircle"
import Add from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Tooltip from '@material-ui/core/Tooltip'

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
  onSetActive: (projectId: string) => void
}

class ProjectsList extends React.Component<ProjectsListProps, any> {

  static defaultProps = {
    items: []
  }

  render() {
    const { classes, items, onRemove, onEdit, onSetActive } = this.props

    const Projects = items.map((project: Project, index) => {
      return (
        <ListItem key={index}>
          <ListItemText primary={project.name} />
          <ListItemSecondaryAction>
            {
              !project.isActive &&
              <Tooltip title="Встановити активним">
                <IconButton
                  aria-label="Set Active"
                  onClick={() => onSetActive(project.id)}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            }
            {
              project.isActive &&
              <Tooltip title="Активний">
                <IconButton>
                  <CheckCircle />
                </IconButton>
              </Tooltip>
            }
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
