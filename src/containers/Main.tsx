import * as React from "react"
import { withStyles } from "@material-ui/core/styles"
import {observer} from 'mobx-react'

import Card from '@material-ui/core/Card'
import CardActions from "@material-ui/core/CardActions"
import CardHeader from '@material-ui/core/CardHeader'
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import red from "@material-ui/core/colors/red"
import Divider from "@material-ui/core/Divider"
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import MainContext, { SaveRecord } from './../contexts/main-context'
import ProjectContext from './../contexts/project-context'
import { Category, Option, Project } from '../models'
import ProjectOptionCard from './../components/project-option-card'

const styles = (theme: any): any => ({
  card: {
    boxShadow: 'none'
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: red[500]
  },
  options: {
    maxHeight: 400,
    overflowY: 'auto'
  }
})

interface MainState {
  selectedOptions: SaveRecord
  anchorProjectsMenuEl: any
}

@observer
class Main extends React.Component<any, MainState> {
  constructor(props: any) {
    super(props)

    this.state = {
      anchorProjectsMenuEl: null,
      selectedOptions: {}
    }
  }

  handleOptionChange(category: Category, selectedOptions: Option[]) {
    this.setState({
      selectedOptions: {
        ...this.state.selectedOptions,
        [category.id]: selectedOptions
      }
    })
  }

  handleOnSave() {
    MainContext.saveRecord(this.state.selectedOptions)
      .then(() => this.closePopup())
  }

  closePopup() {
    window.close()
  }

  handleClick = event => {
    this.setState({ anchorProjectsMenuEl: event.currentTarget });
  };

  handleProjectSelect(project: Project) {
    ProjectContext.setActiveProject(project.id)
      .then(() => {
        this.setState({
          anchorProjectsMenuEl: null
        })
      })
  }


  render() {
    const { classes } = this.props
    const { anchorProjectsMenuEl } = this.state
    const project = ProjectContext.activeProject

    if (!project) {
      return (
        <div>
          You don't have active project. Create new one!
        </div>
      )
    }

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Project"
              className={classes.avatar}>
              M
            </Avatar>
          }
          action={
            <IconButton onClick={this.handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={project.name}
        />
        <Menu
          id="projects-list-menu"
          anchorEl={anchorProjectsMenuEl}
          open={Boolean(anchorProjectsMenuEl)}
        >
          {
            ProjectContext.projects
              .filter(project => !project.isActive)
              .map(project => (
                <MenuItem
                  onClick={() => this.handleProjectSelect(project)}>
                  {project.name}
                </MenuItem>
              ))
          }
        </Menu>
        <Divider />
        <div className={classes.options}>
          {
            project.categories.map((category: Category, index: number) =>
              <React.Fragment>
                <ProjectOptionCard
                  name={category.name}
                  options={category.options}
                  onSelectedChange={
                    (selectedOptions: Option[]) =>
                      this.handleOptionChange(category, selectedOptions)
                  }/>
                {
                  index < project.categories.length-1 && <Divider />
                }
              </React.Fragment>
            )
          }
        </div>
        <Divider />
        <CardActions className={classes.bottomActions}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => this.handleOnSave}>Зберегти</Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(Main)
