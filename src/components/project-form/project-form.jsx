import * as React from "react";
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import './project-form.css';

export class ProjectForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      isActive: false,
      categories: []
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryValueChange = this.handleCategoryValueChange.bind(this);
    this.categoryStateToValue = this.categoryStateToValue.bind(this);
    this.categoryValueToState = this.categoryValueToState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.newCategory = this.newCategory.bind(this);
    this.onCategoryNameChange = this.onCategoryNameChange.bind(this);
  }

  categoryValueToState(value='') {
    return value.split(',');
  }

  categoryStateToValue(value) {
    return value.map(v => v.trim()).join(', ');
  }

  handleNameChange(e) {
    this.setState({ title: e.target.value });
  }

  handleCategoryValueChange(id, e) {
    const value = this.categoryValueToState(e.target.value);
    const categories = this.state.categories.map((category) => {
      if (category.id === id) {
        category.values = value;
      }
      return category
    });

    this.setState({
      categories
    })
  }

  onSubmit() {
    this.props.onSubmit(this.state)
  }

  newCategory() {
    const category = { id: this.state.categories.length, name: 'New Category', values: [] };
    this.setState({
      categories: [...this.state.categories, category]
    })
  }

  onCategoryNameChange(categoryId, name) {
    this.setState({
      categories: this.state.categories.map(c => {
        if (c.id === categoryId) {
          c.name = name
        }
        return c;
      })
    })
  }

  render() {
    const categories = this.state.categories.map((category) => {
      const value = this.categoryStateToValue(category.values);
      return (
        <FormGroup>
          <FormControl
            type="text"
            value={category.name}
            placeholder="Category name"
            onChange={(e) => this.onCategoryNameChange(category.id, e.target.value)}
          />
          <FormControl componentClass="textarea"
                       className="textarea-compact"
                       placeholder="Type options separated by comma, for example: Політика, Економіка, Спорт..."
                       value={value}
                       onChange={(e) => this.handleCategoryValueChange(category.id, e)} />
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

        <Button onClick={this.newCategory} type="button">New Category</Button>
        <br/>
        <Button onClick={this.onSubmit} type="button">Create</Button>
      </Form>
    )
  }
}