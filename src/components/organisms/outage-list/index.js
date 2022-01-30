import React, { Component } from "react"
import { Segment, Input, Dropdown, Icon } from "semantic-ui-react"

// Local
import { OutageCard, Navbar } from "../../atoms"
import * as outage_data from "../../../data/outage-config"
import "./styles.sass"

class OutageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      outages: [],
      visibleOutages: [],
      filters: {
        severity: "",
        status: "",
        title: "",
        id: ""
      },
      sorting: {
        start: "descending",
        end: ""
      }
    }
    this.props.updateTitle("Past Outages")
  }

  filter = (data, column) => {
    const outages = [...this.state.outages]
    const filters = Object.assign({}, this.state.filters)
    let visible

    // Filter items using existing filters
    Object.keys(filters).forEach(key => {
      let filter = filters[key]
      if (filter) {
        visible = outages.filter(outage => outage[key].toString().match(filter))
      }
    })
    // Apply new filter
    visible = outages.filter(outage => outage[column].toString().match(data.value))
    filters[column] = data.value
    this.setState({ visibleOutages: visible, filters })
  }

  sort = column => {
    let sorting = Object.assign({}, this.state.sorting)
    let outages = [...this.state.visibleOutages]
    let visible

    switch (column) {
      case "start":
        if (sorting.start === "descending") {
          visible = outages.sort((a, b) => (a.start_time_ms_utc < b.start_time_ms_utc ? -1 : a.start_time_ms_utc > b.start_time_ms_utc ? 1 : 0))
          sorting = { start: "ascending", end: "" }
        } else {
          visible = outages.sort((a, b) => (a.start_time_ms_utc > b.start_time_ms_utc ? -1 : a.start_time_ms_utc < b.start_time_ms_utc ? 1 : 0))
          sorting = { start: "descending", end: "" }
        }
        this.setState({ sorting, visibleOutages: visible })
        return
      case "end":
        if (sorting.end === "descending") {
          visible = outages.sort((a, b) => (a.end_time_ms_utc < b.end_time_ms_utc ? -1 : a.end_time_ms_utc > b.end_time_ms_utc ? 1 : 0))
          sorting = { end: "ascending", start: "" }
        } else {
          visible = outages.sort((a, b) => (a.end_time_ms_utc > b.end_time_ms_utc ? -1 : a.end_time_ms_utc < b.end_time_ms_utc ? 1 : 0))
          sorting = { end: "descending", start: "" }
        }
        this.setState({ sorting, visibleOutages: visible })
        return
      default:
        return
    }
  }

  componentDidMount() {
    fetch("/api/fetch-outage", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => (res.ok ? res.json() : null))
      .then(res => {
        if (res) this.setState({ outages: res, visibleOutages: res })
        else console.log("Sorry, something went wrong!")
      })
  }

  render() {
    const { visibleOutages, filters, sorting } = this.state
    return (
      <>
        <Navbar />
        <div id="outage-list">
          <h2>Outages</h2>
          <Segment>
            <Segment vertical>
              <div id="columns">
                <div className="ref">
                  <Input type="number" placeholder="#" min="1" value={filters.id} onChange={(e, data) => this.filter(data, "id")} />
                </div>
                <div className="status">
                  <Dropdown
                    placeholder="Status"
                    fluid
                    selection
                    clearable
                    closeOnBlur
                    onChange={(e, data) => this.filter(data, "status")}
                    options={outage_data.status}
                    value={filters.status}
                  />
                </div>
                <div className="severity">
                  <Dropdown
                    placeholder="Severity"
                    fluid
                    selection
                    clearable
                    closeOnBlur
                    onChange={(e, data) => this.filter(data, "severity")}
                    options={outage_data.severity}
                    value={filters.severity}
                  />
                </div>
                <div className="title">
                  <Input type="text" placeholder="Outage Title" value={filters.title} onChange={(e, data) => this.filter(data, "title")} />
                </div>
                <div className={sorting.start ? "start " + sorting.start : "start"} onClick={() => this.sort("start")}>
                  <p>Start Time (local)</p>
                  <Icon name="down arrow" />
                  <Icon name="up arrow" />
                </div>
                <div className={sorting.end ? "end " + sorting.end : "end"} onClick={() => this.sort("end")}>
                  <p>End Time (local)</p>
                  <Icon name="down arrow" />
                  <Icon name="up arrow" />
                </div>
              </div>
            </Segment>
            {visibleOutages?.map(outage => (
              <OutageCard {...outage} key={outage.id} />
            ))}
          </Segment>
        </div>
      </>
    )
  }
}

export default OutageList
