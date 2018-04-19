import React from 'react';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Panel
} from "react-bootstrap";
import merge from 'lodash/merge';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import {Spreadsheet} from "../../core/spreadsheet";
import {Storage} from "../../core/storage";

export class MainForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categoriesState: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.debugStorage = this.debugStorage.bind(this);
    this.removeProjects = this.removeProjects.bind(this);
  }

  onSelect(categoryId, value) {
    const changedCategoriesState = merge({}, this.state.categoriesState, {
      [categoryId]: {
        [value]: !get(this.state.categoriesState, `${categoryId}.${value}`, false)
      }
    });

    this.setState({
      categoriesState: changedCategoriesState
    })
  }

  onSubmit() {
    const getLinkOnCurrentSite = (callback) => {
      window.chrome.tabs.getSelected(null, (tab) => {
        callback(tab.url, tab.title.replace('"', ''));
      });
    };

    const selectedValues = map(this.state.categoriesState, (values, categoryId) =>
      [categoryId, map(filter(Object.entries(values), (value) => value[1]), f => f[0]).join(', ')]);

    const data = map(sortBy(selectedValues, v => v[0]), i => i[1]);

    getLinkOnCurrentSite((url, siteTitle) => {
      const link = `=HYPERLINK(\"${url}\";\"${siteTitle}\")`;
      Spreadsheet.addRow([['', link, ...data]], this.props.project.spreadsheetId)
    });
  }

  debugStorage() {
    Storage.getData((d) => console.log(d));
  }

  removeProjects() {
    Storage.clearAll();
  }

  render() {
    const categories = this.props.project.categories.map((category) => {
      const {id, name, values} = category;
      const options = values.map(
        value =>
          <ListGroupItem
            onClick={() => this.onSelect(id, value)}
            bsStyle={get(this.state.categoriesState, `${id}.${value}`, false) ? 'success' : 'default'}>
              {value}
            </ListGroupItem>);
      return (
        <Panel>
          <Panel.Heading>{name}</Panel.Heading>
          <ListGroup>
            {React.Children.toArray(options)}
          </ListGroup>
        </Panel>
      )
    });

    let el;

    if (this.props.project) {
      el = (<div>
        <h4>{this.props.project.title}</h4>
          {React.Children.toArray(categories)}
          <Button onClick={this.onSubmit}>Ok</Button>
        {/*<br/>
        <Button onClick={this.debugStorage}>Debug</Button>
        <br/>
        <Button onClick={this.removeProjects}>Remove Projects</Button>*/}
        </div>);
    } else {
      el = (<div>
        <span>You don't have any projects</span>
        <br />
        <span>Go to Chrome Extensions -> Media Monitor extension -> Options,</span>
        <br />
        <span>and create new one.</span>
      </div>)
    }

    return (
      el
    )
  }
}
