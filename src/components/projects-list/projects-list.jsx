import * as React from "react";
import {ListGroup, ListGroupItem} from 'react-bootstrap';


export class ProjectsList extends React.Component {
  onProjectClick(id) {
    this.props.onChange(id)
  }

  render() {
    const projects = this.props.projects.map((item) => (
      <ListGroupItem onClick={() => this.onProjectClick(item.id)}>
        {`${item.title}${item.isActive ? ' (Active)' : ''}`}
      </ListGroupItem>
    ));

    return (
      <ListGroup>
        {React.Children.toArray(projects)}
      </ListGroup>
    )
  }
}