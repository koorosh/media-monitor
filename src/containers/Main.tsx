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

import MainContext, { SaveRecord } from './../contexts/main-context'
import ProjectContext from './../contexts/project-context'
import { Category, Option } from '../models'
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
}

@observer
class Main extends React.Component<any, MainState> {
  constructor(props: any) {
    super(props)

    this.state = {
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

  render() {
    const { classes } = this.props
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
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={project.name}
        />
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
