import React, { Component } from 'react';
import './App.css';
import {MainForm} from "./components/main-form/main-form";

export class App extends Component {



  render() {
    const data = {
      projects: {
        ['projectId1']: {
          spreadsheetId: 'projectId1',
          title: 'Project 1',
          isActive: false,
          categories: [
            {
              name: 'Gender',
              values: ['F-E', 'M-E', 'N-E']
            },
            {
              name: 'Categories',
              values: ['Politics', 'Economics', 'Sport']
            }
          ]
        },
        ['projectId2']: {
          spreadsheetId: 'projectId2',
          title: 'Project 2',
          isActive: true,
          categories: [
            {
              name: 'AAAAA',
              values: ['F-E', 'M-E', 'N-E']
            },
            {
              name: 'Categories123',
              values: ['Politics', 'Economics', 'Sport']
            }
          ]
        }
      }
    };
    return (
      <div className="container-fluid">
        <MainForm projects={Object.values(data.projects)}/>
      </div>
    );
  }
}
