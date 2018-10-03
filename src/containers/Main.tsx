import * as React from "react";
import { find } from 'lodash'
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from '@material-ui/core/CardHeader';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import red from "@material-ui/core/colors/red";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";

import Storage from '../core/chrome-plugin-api/storage'
import Authenticate from '../core/chrome-plugin-api/authentificate'
import { configureAxios } from '../core/request'

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
  },
  checkbox: {
    width: 36,
    height: 36
  }
});

class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      gilad: true,
      jason: false,
      antoine: false
    };
  }

  componentDidMount() {
    const self = this;

    Authenticate.onSignInChanged()
      .then((isLoggedIn) => {
        this.setState({
          isLoggedIn
        });
      });

    Authenticate.getToken()
      .then((token: string) => {
        this.setState({
          isLoggedIn: !!token
        })

        configureAxios(token);
      });

    Storage.getData()
      .then(projects => {
        const activeProject = find(projects, (value: any, projectName: string) => value.isActive)

        if(activeProject) {
          self.setState({
            project: activeProject
          })
        }
      })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { gilad, jason, antoine } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
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
        <CardContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={gilad}
                    onChange={this.handleChange("gilad")}
                    value="gilad"
                  />
                }
                label="Gilad Gray"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={jason}
                    onChange={this.handleChange("jason")}
                    value="jason"
                  />
                }
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={antoine}
                    onChange={this.handleChange("antoine")}
                    value="antoine"
                  />
                }
                label="Antoine Llorca"
              />
            </FormGroup>
          </FormControl>
        </CardContent>
        <Divider />
        <CardContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gilad}
                    onChange={this.handleChange("gilad")}
                    value="gilad"
                  />
                }
                label="Gilad Gray"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jason}
                    onChange={this.handleChange("jason")}
                    value="jason"
                  />
                }
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={antoine}
                    onChange={this.handleChange("antoine")}
                    value="antoine"
                  />
                }
                label="Antoine Llorca"
              />
            </FormGroup>
          </FormControl>
        </CardContent>
        <Divider />
        <CardActions>
          <Button>Save</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Main)
