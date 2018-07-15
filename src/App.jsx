import React, { Component } from 'react';
import './App.css';
import {MainForm} from "./components/main-form/main-form";
import {Storage} from "./core/storage";
import {Auth} from "./core/auth";
import {configureAxios} from "./core/request";

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      project: {
        categories: [],
        title: '',
        spreadsheetId: ''
      }
    }
  }

  componentDidMount() {
    const self = this;

    Auth.onSignInChanged((userInfo, isSignedIn) => {
      console.log(userInfo);
      this.setState({
        isLoggedIn: isSignedIn
      });
    });

    Auth.getToken((token) => {
      this.setState({
        isLoggedIn: !!token
      });

      configureAxios(token);
    });

    Storage.getData(projects => {
      const activeProject = Object.values(projects).find((project) => project.isActive);

      if(activeProject) {
        self.setState({
          project: activeProject
        })
      }
    })
  }
  render() {
    return (
      <div className="container-fluid">
        {this.state.isLoggedIn ?
          <MainForm project={this.state.project}/> :
          <span>You are not logged in into Google account</span>}
      </div>
    );
  }
}
