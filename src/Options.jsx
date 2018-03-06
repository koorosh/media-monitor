import React from 'react';
import { Col, Nav, NavItem, Row, Tab} from 'react-bootstrap';

export class Options extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      projects: [],
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={1}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first">User</NavItem>
                <NavItem eventKey="second">Projects</NavItem>
                <NavItem eventKey="third">New Project</NavItem>
              </Nav>
            </Col>
            <Col sm={11}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">Tab 1 content</Tab.Pane>
                <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
                <Tab.Pane eventKey="third">Tab 2 content</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>

    )
  }
}
