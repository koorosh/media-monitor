import * as React from "react";
import { find } from 'lodash'
import { withStyles } from "@material-ui/core/styles";
import {observer} from 'mobx-react';

import Card from '@material-ui/core/Card';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from '@material-ui/core/CardHeader';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import red from "@material-ui/core/colors/red";
import Divider from "@material-ui/core/Divider";

import Storage from '../core/chrome-plugin-api/storage'
import Authenticate from '../core/chrome-plugin-api/authentificate'
import { configureAxios } from '../core/request'
import MainContext, { SaveRecord } from './../contexts/main-context'
import ProjectContext from './../contexts/project-context'
import { Category, Option, Project } from '../models'
import ProjectOptionCard from './../components/project-option-card'

const styles = (theme: any) => ({
  card: {
    minWidth: 250,
    maxWidth: 400
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

interface MainState {
  selectedOptions: SaveRecord[]
}

@observer
class Main extends React.Component<any, MainState> {
  constructor(props: any) {
    super(props)

    this.state = {
      selectedOptions: []
    };
  }

  handleOptionChange = (category: Category, selectedOptions: Option[]) => {
    this.setState({
      selectedOptions: {
        ...this.state.selectedOptions,
        [category.id]: selectedOptions
      }
    });
  };

  handleOnSave = () => {
    MainContext.saveRecord(this.state.selectedOptions)
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
          title="Project name"
        />
        <Divider />
        {
          project.categories.map((category: Category) =>
            <React.Fragment>
              <ProjectOptionCard
                name={category.name}
                options={category.options}
                onSelectedChange={(selectedOptions: Option[]) => this.handleOptionChange(category, selectedOptions)}/>)
              <Divider />
            </React.Fragment>
          )
        }
        <CardActions>
          <Button onClick={this.handleOnSave}>Save</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Main)
