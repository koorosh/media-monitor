import * as React from "react"
import { observer } from 'mobx-react'
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CssBaseline from '@material-ui/core/CssBaseline'
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import red from "@material-ui/core/colors/red"
import AddIcon from "@material-ui/icons/Add"

import EditProjectForm from "./../components/edit-project-form"
import ProjectsList from "./../components/projects-list"
import { Project } from '../models'
import ProjectContext from '../contexts/project-context'

enum OptionsMode {
  VIEW,
  EDIT
}

const styles = (theme: any) => ({
  root: {
    flexGrow: 1
  },
  card: {
    minWidth: 400,
    maxWidth: 800
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: red[500]
  },
  checkbox: {
    width: 36,
    height: 36
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: "auto"
  }
})

interface OptionsState {
  //projects: Project[]
  mode: OptionsMode
  editProject: Project
}

@observer
class Options extends React.Component<any, OptionsState> {
  constructor(props: any) {
    super(props)

    this.state = {
      mode: OptionsMode.VIEW,
      editProject: undefined
    }
  }

  onAddProjectClick = () => {
    this.setState({
      mode: OptionsMode.EDIT,
      editProject: undefined
    })
  }

  onNewProjectSubmit = (project: Project, isNew: boolean) => {
    if (isNew) {
      ProjectContext.createProject(project)
        .then(() => {
          this.setState({
            mode: OptionsMode.VIEW
          })
        })
    }
    else {
      ProjectContext.updateProject(project)
        .then(() => {
          this.setState({
            mode: OptionsMode.VIEW
          })
        })
    }
  }

  onNewProjectFormClose = () => {
    this.setState({
      mode: OptionsMode.VIEW,
      editProject: undefined
    })
  }

  onProjectRemove = (projectId: string) => {
    const project = ProjectContext.projects.find(p => p.id === projectId)
    ProjectContext.removeProject(project)
  }

  onProjectEdit = (projectId: string) => {
    this.setState({
      mode: OptionsMode.EDIT,
      editProject: ProjectContext.projects.find(project => project.id === projectId)
    })
  }

  render() {
    const { classes } = this.props
    const { mode, editProject } = this.state
    return (
      <React.Fragment>
        <CssBaseline />
        <Card className={classes.card}>
          {
            mode === OptionsMode.VIEW && (
              <React.Fragment>
                <CardContent>
                  <ProjectsList
                    items={ProjectContext.projects}
                    onEdit={projectId => this.onProjectEdit(projectId)}
                    onRemove={projectId => this.onProjectRemove(projectId)}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    onClick={this.onAddProjectClick}
                    variant="fab"
                    mini
                    color="primary"
                    aria-label="Add"
                    className={classes.button}
                  >
                    <AddIcon />
                  </Button>
                </CardActions>
              </React.Fragment>
            )
          }
          {
            mode === OptionsMode.EDIT && (
              <EditProjectForm
                initProject={editProject}
                onSubmit={(project: Project) => this.onNewProjectSubmit(project, !editProject)}
                onClose={() => this.onNewProjectFormClose()}
              />
            )
          }
        </Card>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Options)
