import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import {Auth} from "./core/auth";
import {ProjectForm} from "./components/project-form/project-form";
import {ProjectsList} from "./components/projects-list/projects-list";
import {Spreadsheet} from "./core/spreadsheet";

export class Options extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      isLoggedIn: false,
      projects: [],
    };

    this.onActiveProjectChange = this.onActiveProjectChange.bind(this);
    this.onNewProject = this.onNewProject.bind(this);
  }

  componentDidMount() {
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
      console.log(token)
    });

    this.getProjects();
  }

  getProjects() {
    Spreadsheet.getAll((items) => {
      this.setState({
        projects: items
      })
    })
  }

  onActiveProjectChange(projectId) {
    Spreadsheet.setActive(projectId, () => {
      this.getProjects();
    })
  }

  onNewProject(project) {
    console.log(project);
    Spreadsheet.create(project, () => {
      this.getProjects();
    });
  }

  render() {

    const projects = this.state.projects.map((project) => {
      return {
        id: project.spreadsheetId,
        title: project.title,
        isActive: project.isActive,
      }
    });

    return (
      <div className="container-fluid">
        <Tabs defaultActiveKey={1} id="options-tabs">
          <Tab eventKey={1}
               title="Projects"
               disabled={!this.state.isLoggedIn}>
            <ProjectsList onChange={this.onActiveProjectChange} projects={projects}/>
          </Tab>
          <Tab eventKey={2}
               title="New Project"
               disabled={!this.state.isLoggedIn}>
            <ProjectForm onSubmit={ (project) => this.onNewProject(project)}/>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
