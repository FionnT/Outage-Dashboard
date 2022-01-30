import React, { Component } from "react"
import { Segment, Button, Dropdown, Checkbox, Message } from "semantic-ui-react"
import { DateTimeInput } from "semantic-ui-calendar-react"

// local
import { copyToClipboard, convertTimeZone } from "../../../helpers"

import * as oa_data from "../../../data/outage-announcement"
import "./styles.sass"

class OutageAnnouncement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: "",
      config: { outageMessage: null, playOutageInQueue: "true" },
      notify: "clipboard hidden",
      forceCloseActivated: false,
      warnRegardingForceClose: false,
      startTime: "",
      endTime: ""
    }
  }

  componentDidMount() {
    let name_map = []
    oa_data.message_map.forEach(message => {
      let name = Object.assign({}, message)
      name.text = message.value
      name_map.push(name)
    })
    this.setState({ name_map })
  }

  handleMessageChange = (e, data) => {
    let config = Object.assign({}, this.state.config)
    let warnRegardingForceClose

    oa_data.message_map.forEach(item => {
      if (item.value === data.value) warnRegardingForceClose = item.warnregardingforceclose === "true" ? true : false
    })
    config.outageMessage = data.value

    this.setState({
      config,
      value: data.value.toString(),
      warnRegardingForceClose
    })
  }

  handleSkillChange = (e, data) => {
    const { value } = data
    let routes = []
    let displayAll = false

    // Use for loop so we can break if All is selected
    for (let item in value) {
      if (value[item] === "all") {
        displayAll = true
        routes = []
        break
      } else routes.push(value[item])
    }

    if (displayAll)
      oa_data.skills_map.forEach((item, index) => {
        if (index >= 1) routes.push(item.value)
      })

    // Remove duplicates and convert to string
    routes = [...new Set(routes)].toString()
    this.setState({ routes })
  }

  handlePlayback = (e, data) => {
    const { checked } = data
    let config = Object.assign({}, this.state.config)
    if (checked) config.playOutageInQueue = checked.toString()
    else delete config.playOutageInQueue
    this.setState({ config })
  }

  handleForceClose = (e, data) => {
    const { checked } = data
    let config = Object.assign({}, this.state.config)

    let forceCloseActivated

    if (checked) {
      config.hardClose = checked.toString()
      forceCloseActivated = true
    } else delete config.hardClose

    this.setState({ config, forceCloseActivated })
  }

  handleCopy = target => {
    let data = document.getElementById(target).innerText
    copyToClipboard(data)
    this.setState({ notify: "clipboard visible" }, () => {
      setTimeout(() => {
        this.setState({ notify: "clipboard hidden" })
      }, 2000)
    })
  }

  handleDateTime = (e, data, isStartTime) => {
    let selectedTime = data.value
    let config = Object.assign({}, this.state.config)

    if (selectedTime !== "") {
      let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      let utcDateTime = convertTimeZone(selectedTime, userTimeZone, "UTC").replace("T", " ") + " UTC"
      if (isStartTime) config.startTime = utcDateTime
      else config.endTime = utcDateTime
    } else {
      if (isStartTime) delete config.startTime
      else delete config.endTime
    }

    if (isStartTime) this.setState({ startTime: selectedTime, config })
    else this.setState({ endTime: selectedTime, config })
  }

  render() {
    const { routes, config, notify, forceCloseActivated, warnRegardingForceClose, startTime, endTime } = this.state
    return (
      <>
        <div id="oa-wrapper">
          {this.props.title ? <h2>Outage Announcement</h2> : null}
          <Message positive className={notify}>
            Copied to Clipboard
          </Message>
          <Segment className="oa" vertical>
            <Segment floated="left">
              <Dropdown
                placeholder="Select by message text (type to search)"
                fluid
                search
                selection
                clearable
                closeOnBlur
                value={config.outageMessage}
                onChange={this.handleMessageChange}
                options={oa_data.message_map}
              />
              <p style={{ textAlign: "center", fontSize: "1.15em", padding: "10px 0 0px", color: "gray" }}>- OR -</p>
              <Dropdown
                placeholder="Select by message name (type to search)"
                fluid
                search
                selection
                clearable
                closeOnBlur
                value={config.outageMessage}
                onChange={this.handleMessageChange}
                options={this.state.name_map}
              />
              <Segment className="toggle">
                <span>Play Outage in Queue:</span>
                <Checkbox toggle floated="right" onClick={this.handlePlayback} defaultChecked label={config.playOutageInQueue === "true" ? "Yes" : "No"} />
              </Segment>
              <Segment className="toggle">
                <span>Force Close Lines:</span>
                <Checkbox toggle floated="right" onClick={this.handleForceClose} label={config.hardClose === "true" ? "Yes" : "No"} />
              </Segment>
            </Segment>
            <Segment floated="right">
              <div>
                {forceCloseActivated ? <span className="warn">Force Close Activated</span> : null}
                {!forceCloseActivated && warnRegardingForceClose ? (
                  <span className="warn">This OA does not force close the line. If you need to force close, please enable it.</span>
                ) : null}
                <p id="config">{config.outageMessage ? JSON.stringify(config) : "Select a message"}</p>
              </div>
              <Button onClick={() => this.handleCopy("config")}>Click to Copy</Button>
            </Segment>
          </Segment>
          <Segment className="oa" vertical>
            <Segment floated="left">
              <Dropdown
                placeholder="Select a skill/language (type to search)"
                fluid
                search
                multiple
                selection
                closeOnBlur
                onChange={this.handleSkillChange}
                options={oa_data.skills_map}
              />
            </Segment>
            <Segment floated="right">
              <div id="route">
                <p>{routes ? "SKILL:" + routes : "Select a skill/language"}</p>
              </div>
              <Button onClick={() => this.handleCopy("route")}>Click to Copy</Button>
            </Segment>
          </Segment>
          <Segment className="oa" vertical>
            <Segment floated="left" className="date">
              <div>
                <p>Start time (your local time):</p>
              </div>
              <DateTimeInput
                preserveViewMode={false}
                clearable
                dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                name="startTime"
                placeholder="Use to delay start time"
                iconPosition="left"
                value={startTime}
                onChange={(e, data) => this.handleDateTime(e, data, true)}
              />
            </Segment>
            <Segment floated="right" className="date">
              <div>
                <p>End time (your local time):</p>
              </div>
              <DateTimeInput
                preserveViewMode={false}
                clearable
                dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                name="endTime"
                placeholder="Use to preset end time"
                iconPosition="left"
                value={endTime}
                onChange={(e, data) => this.handleDateTime(e, data, false)}
              />
            </Segment>
          </Segment>
        </div>
      </>
    )
  }
}

export default OutageAnnouncement
