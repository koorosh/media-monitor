import React from 'react';
import {
  Checkbox, Col, DropdownButton, Form, FormGroup,
  MenuItem, Panel
} from "react-bootstrap";
import ControlLabel from "react-bootstrap/es/ControlLabel";

export class MainForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentProject: props.projects.find((project) => project.isActive),
      categoriesState: []
    }
  }

  render() {
    const {currentProject} = this.state;

    const categories = currentProject.categories.map((category, idx) => {
      const {name, values} = category;

      const options = values.map((val) => {
        return (<Checkbox className="size-lg">{val}</Checkbox>)
      });
      return (
        <FormGroup controlId={`category-${idx}-group`} bsSize="lg">
          <Panel>
            <Panel.Heading>{name}</Panel.Heading>
            <Panel.Body>
              <FormGroup>
                {React.Children.toArray(options)}
              </FormGroup>
            </Panel.Body>
          </Panel>
        </FormGroup>
      )
    });

    const projectMenuItem = this.props.projects.map((project, idx) => {
      return (
        <MenuItem eventKey={idx} active={project.isActive}>{project.title}</MenuItem>
      )
    });

    return (
      <Form>
        <FormGroup controlId="formHorizontalEmail">
          <DropdownButton title={currentProject.title}
                          id="projects-dropdown">
            {React.Children.toArray(projectMenuItem)}
          </DropdownButton>
        </FormGroup>

        {React.Children.toArray(categories)}
      </Form>
    )
  }
}
