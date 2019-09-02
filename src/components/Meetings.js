import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
  Label,
  Button,
  Form,
  FormGroup,
  Input,
  Containerclick
} from "reactstrap";
let that;

class Meetings extends Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = { groups: [], meetings: [] };
  }

  componentDidMount() {
    this.downloadGroups();
    this.downloadMeetings();
  }
  downloadGroups() {
    fetch("http://localhost:3000/groups")
      .then(response => response.json())
      .then(data => {
        var newState = { ...that.state, groups: data };
        that.setState(newState);
      })
      .catch(err => {
        debugger;
      });
  }

  downloadMeetings() {
    fetch("http://localhost:3000/meetings")
      .then(response => response.json())
      .then(data => {
        debugger;
        var newState = { ...that.state, meetings: data };
        that.setState(newState);
      })
      .catch(err => {
        debugger;
      });
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    var newState = Object.assign({}, that.state);
    newState[name] = value;
    debugger;
    that.setState(newState);
  }

  send() {
    fetch("http://localhost:3000/meetings", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(that.state)
    }).then(() => that.downloadMeetings());
  }

  render() {
    return (
      <div>
        <Container />
        <div>
          {this.state.groups.map(g => (
            <div>
              <label>{g.groupName}</label>, id:<label>{g.id}</label>
            </div>
          ))}
        </div>
        <Row>
          <Form action="" method="post">
            <FormGroup>
              <Input
                placeholder="Enter Group ID"
                name="groupID"
                onChange={this.handleChange.bind(this)}
              />

              <Label>Enter Start Date</Label>
              <Input
                type="text"
                placeholder="2011-12-18 13:17:17"
                name="startDate"
                onChange={this.handleChange.bind(this)}
              />
              <Label>Enter end Date</Label>
              <Input
                type="text"
                name="endDate"
                placeholder="2011-12-18 13:17:17"
                onChange={this.handleChange.bind(this)}
              />
            </FormGroup>
            <Input
              placeholder="Details"
              name="details"
              onChange={this.handleChange.bind(this)}
            />

            <Button type="button" onClick={this.send}>
              Save
            </Button>
          </Form>
        </Row>

        <Row>
          {this.state.meetings.map(m => {
            return (
              <Col sm="5">
                <Card body>
                  <CardTitle>
                    from: {m.startDate} <br /> to: {m.endDate}
                  </CardTitle>
                  <CardText>group: {m.groupID}</CardText>
                  <CardText>{m.details}</CardText>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default Meetings;
