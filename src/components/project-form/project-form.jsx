import * as React from "react";
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import './project-form.css';

export class ProjectForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      isActive: false,
      categories: [
        {
          name: 'Gender',
          values: ['Ч-Е', 'Ж-Е']
        },
        {
          name: 'Category',
          values: ['Політика', 'Економіка']
        }
      ]
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryValueChange = this.handleCategoryValueChange.bind(this);
    this.categoryStateToValue = this.categoryStateToValue.bind(this);
    this.categoryValueToState = this.categoryValueToState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  categoryValueToState(value='') {
    return value.split(',').map(v => v.trim());
  }

  categoryStateToValue(value) {
    return value.join(', ');
  }

  handleNameChange(e) {
    this.setState({ title: e.target.value });
  }

  handleCategoryValueChange(categoryName, e) {

    const value = this.categoryValueToState(e.target.value);

    const categories = this.state.categories.map((category) => {

      if (category.name === categoryName) {
        return {
          name: categoryName,
          values: value
        }
      } else {
        return category
      }
    });

    this.setState({
      categories
    })
  }

  onSubmit() {
    this.props.onSubmit(this.state)
  }

  render() {
    const categories = this.state.categories.map((category) => {
      const value = this.categoryStateToValue(category.values);
      return (
        <FormGroup>
          <ControlLabel>{category.name}</ControlLabel>
          <FormControl componentClass="textarea"
                       className="textarea-compact"
                       placeholder="Type options separated by comma, for example: Політика, Економіка, Спорт..."
                       value={value}
                       onChange={(e) => this.handleCategoryValueChange(category.name, e)} />
        </FormGroup>
      )
    });

    return (
      <Form>
        <FormGroup controlId="projectNameInput">
          <ControlLabel>Project Name</ControlLabel>
          <FormControl
            type="text"
            placeholder="Name of spreadsheet and project"
            value={this.state.title}
            onChange={this.handleNameChange}
          />
        </FormGroup>

        {React.Children.toArray(categories)}

        <Button onClick={this.onSubmit} type="button">Create</Button>
      </Form>
    )
  }
}