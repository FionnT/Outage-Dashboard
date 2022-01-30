import React, { Component } from "react"
import { Outage, OutageAnnouncement } from "../../molecules"
import { Frame, Tabs, Navbar } from "../../atoms"
import { metrics } from "../../../data/outage-config"
import { convertTimeZone } from "../../../helpers"

import "./styles.sass"

class ExistingOutage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      tabs: [],
      categories: []
    }
  }

  componentDidMount() {
    fetch("/api/fetch-outage", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ id: this.state.id })
    })
      .then(res => (res.ok ? res.json() : null))
      .then(res => {
        if (res) {
          let state = Object.assign({}, res)
          let times = ["start_time", "end_time", "escalation_time", "oa_start_time", "oa_end_time"]
          times.forEach((time, index) => {
            let timeString = time + "_ms_utc"
            let local
            let pt
            let ms_utc = res[timeString]
            if (ms_utc) {
              // console.log("conversion: ", ms_utc, res.timezone)
              local = index < 3 ? convertTimeZone(ms_utc, "UTC", res.timezone) : convertTimeZone(ms_utc, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone)
              pt = convertTimeZone(ms_utc, "UTC", "America/Los_Angeles") + " PT"
            }
            state[time] = {
              local,
              pt,
              ms_utc
            }
            delete state[timeString]
          })
          this.handleRender(state)
        } else console.log("Sorry, something went wrong")
      })
  }

  setMetricCategories = categories => this.setState({ categories })

  // Cannot update a React component during render, which would be required for loading the tabs programatically
  // Compute render, and then render after data is loaded
  handleRender = state => {
    let data = Object.assign({}, state)
    let items = [<Outage key={"Outage"} type="existing" name={`Outage #${data.id}}`} data={data} />, <OutageAnnouncement key={"OutageAnnouncement"} name="Outage Announcement" />]
    let tabs = <Tabs>{items}</Tabs>
    data.categories?.forEach(category => {
      metrics[category]?.forEach(item => items.push(<Frame url={item.url} name={item.name} />))
    })
    data.tabs = tabs
    this.setState(data)
  }

  render() {
    return (
      <>
        <Navbar />
        <div id="existing-outage">{this.state.tabs}</div>
      </>
    )
  }
}

export default ExistingOutage
