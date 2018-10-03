import * as React from "react"
import { findIndex } from 'lodash'
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import red from "@material-ui/core/colors/red"
import AddIcon from "@material-ui/icons/Add"

import EditProjectForm from "./../components/edit-project-form"
import ProjectsList from "./../components/projects-list"

export class Item {
  constructor() {
    this.id = new Date().getTime()
  }
  id: number
}

export class Option extends Item {
  constructor(public name: string) {
    super()
  }
}

export class Category extends Item {
  constructor(public name: string, public options: Option[] = []) {
    super()
  }
}

export class Project extends Item {
  constructor(public name: string = 'New Project', public categories: Category[] = []) {
    super()
  }
}

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
  projects: Project[]
  mode: OptionsMode
  editProject: Project
}

class Options extends React.Component<any, OptionsState> {
  state = {
    projects: [
      {
        id: 1,
        name: "Моніторинг",
        categories: [
          {
            id: 1,
            name: "Гендер",
            options: [
              { id: 1, name: "Чол" },
              { id: 2, name: "Жін" },
              { id: 3, name: "Сер" }
            ]
          },
          {
            id: 2,
            name: "Посада",
            options: [
              { id: 1, name: "Політика" },
              { id: 2, name: "Суддя" },
              { id: 3, name: "Водій" }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Моніторинг 2",
        categories: [
          {
            id: 1,
            name: "Гендер",
            options: [
              { id: 1, name: "Чол" },
              { id: 2, name: "Жін" },
              { id: 3, name: "Сер" }
            ]
          },
          {
            id: 2,
            name: "Посада",
            options: [
              { id: 1, name: "Політика" },
              { id: 2, name: "Суддя" },
              { id: 3, name: "Водій" }
            ]
          }
        ]
      }
    ],
    mode: OptionsMode.VIEW,
    editProject: new Project("")
  }

  onAddProjectClick = () => {
    this.setState({
      mode: OptionsMode.EDIT
    })
  }

  onNewProjectSubmit = (project: Project, isNew: boolean) => {
    const { projects } = this.state
    if (isNew) {
      this.setState({
        projects: [...projects, project],
        mode: OptionsMode.VIEW
      })
    } else {
      findIndex(projects, p => p.id === project.id)
    }
  }

  onNewProjectFormClose = () => {
    this.setState({
      mode: OptionsMode.VIEW,
      editProject: new Project("")
    })
  }

  onProjectRemove = (projectId: number) => {
    const projects = this.state.projects.filter(
      project => project.id !== projectId
    )
    this.setState({
      projects
    })
  }

  onProjectEdit = (projectId: number) => {
    this.setState({
      mode: OptionsMode.EDIT,
      editProject:
        this.state.projects.find(project => project.id === projectId) ||
        new Project("")
    })
  }

  render() {
    const { classes } = this.props
    const { mode, projects, editProject } = this.state
    return (
      <Card className={classes.card}>
        {mode === OptionsMode.VIEW && (
          <React.Fragment>
            <CardContent>
              <ProjectsList
                items={projects}
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
        )}
        {mode === OptionsMode.EDIT && (
          <EditProjectForm
            initProject={editProject}
            onSubmit={(project: Project) => this.onNewProjectSubmit(project, false)}
            onClose={() => this.onNewProjectFormClose()}
          />
        )}
      </Card>
    )
  }
}

export default withStyles(styles)(Options)
