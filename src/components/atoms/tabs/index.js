import React, { Component } from "react"
import { Menu, Segment } from "semantic-ui-react"

class Tabs extends Component {
  constructor(props) {
    super(props)
    let { children } = this.props
    this.state = {
      activePage: children[0].props.name
    }
  }

  handleMenuClick = ({ name }) => {
    this.setState({ activePage: name })
  }
  render() {
    let { activePage } = this.state
    let { children } = this.props

    return (
      <div>
        <Menu>
          {children.map((child, index) => (
            <Menu.Item key={index} name={child.props.name} active={activePage === child.props.name} onClick={() => this.handleMenuClick(child.props)} />
          ))}
        </Menu>
        {children.map((child, index) => (
          <Segment
            key={index}
            style={{
              display: activePage !== child.props.name ? "none" : "block",
              padding: 0,
              margin: 0
            }}
          >
            {child}
          </Segment>
        ))}
      </div>
    )
  }
}

export default Tabs
