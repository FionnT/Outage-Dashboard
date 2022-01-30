import React, { Component } from "react"
import { Card, Icon } from "semantic-ui-react"
import { Navbar } from "../../atoms"
import "./styles.sass"

class Home extends Component {
  constructor(props) {
    super(props)
    this.props.updateTitle("Outage Dashboard")
  }
  render() {
    return (
      <>
        <Navbar />
        <div id="tiles">
          <Card onClick={() => (document.location.href = "/new")}>
            <Card.Content>
              <Icon name="warning sign" />
              <Card.Header>New Outage</Card.Header>
              <Card.Meta>Create a new outage</Card.Meta>
            </Card.Content>
          </Card>
          <Card onClick={() => (document.location.href = "/status")}>
            <Card.Content>
              <Icon name="heart" />
              <Card.Header>Status Page</Card.Header>
              <Card.Meta>View the status page</Card.Meta>
            </Card.Content>
          </Card>
          <Card onClick={() => (document.location.href = "/outages")}>
            <Card.Content>
              <Icon name="search" />
              <Card.Header>Past Outages</Card.Header>
              <Card.Meta>Search past outages</Card.Meta>
            </Card.Content>
          </Card>
          <Card onClick={() => (document.location.href = "/oa")}>
            <Card.Content>
              <Icon name="volume up" />
              <Card.Header>Outage Announcement</Card.Header>
              <Card.Meta>Configure an outage announcement</Card.Meta>
            </Card.Content>
          </Card>
        </div>
      </>
    )
  }
}

export default Home
