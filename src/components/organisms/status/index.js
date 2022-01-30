import React, { Component } from "react"
import { Segment, Icon } from "semantic-ui-react"

import { Navbar, OutageCard } from "../../atoms"
import * as data from "../../../data/outage-config"
import * as sites from "../../../data/sites"
import "./styles.sass"

class Status extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.props.updateTitle("Status Page")
  }

  componentDidMount() {
    fetch("/api/status", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => (res.ok ? res.json() : null))
      .then(res => {
        if (res) this.setState({ outages: res })
      })
  }

  componentDidUpdate() {
    let segments = Array.from(document.getElementsByClassName("segment"))
    segments.forEach(segment => {
      let hasDiv
      let hasEmpty
      let children = Array.from(segment.children)
      children.forEach(child => {
        if (child.tagName.match("DIV")) hasDiv = true
        if (child.id === "nooutages") hasEmpty = true
      })
      if (!hasDiv && !hasEmpty) {
        let p = document.createElement("p")
        p.id = "nooutages"
        p.innerText = "No recent outages"
        segment.appendChild(p)
      }
      if (hasDiv && hasEmpty) {
        children.forEach(child => {
          if (child.id === "nooutages") segment.removeChild(child)
        })
      }
    })
  }

  handleToggle = value => {
    let element = document.getElementsByClassName(value)[0]
    element.classList.toggle("minimised")
  }

  render() {
    const { outages } = this.state
    return (
      <>
        <Navbar />
        <div id="status-page">
          {data.categories.map(category => (
            <Segment key={category.key} id="wrapper" className={category.value.replaceAll(" ", "")}>
              <div id="category" onClick={() => this.handleToggle(category.value.replaceAll(" ", ""))}>
                <h3>{category.value}</h3>
                <Icon name="minus" />
                <Icon name="plus" />
              </div>
              {data.subcategories.map(subcategory =>
                subcategory.category === category.value ? (
                  <Segment key={subcategory.key}>
                    <h3>{subcategory.value}</h3>
                    {outages && subcategory.value === "CS Site"
                      ? sites.options.map(site => (
                          <Segment key={site.key}>
                            <h4>{site.text}</h4>
                            {outages && outages[category.value].map((outage, i) => (outage.sites?.indexOf(site.value) >= 0 ? <OutageCard key={site.key + i} {...outage} /> : null))}
                          </Segment>
                        ))
                      : outages &&
                        outages[category.value].map((outage, i) =>
                          outage.subcategories?.indexOf(subcategory.value) >= 0 ? <OutageCard key={subcategory.key + i} {...outage} /> : null
                        )}
                  </Segment>
                ) : null
              )}
            </Segment>
          ))}
        </div>
      </>
    )
  }
}

export default Status
