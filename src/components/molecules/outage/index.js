import React, { Component } from "react"
import { Form, Input, Segment, TextArea, Dropdown, Button, Icon } from "semantic-ui-react"
import { DateTimeInput } from "semantic-ui-calendar-react"

// Local
import "./styles.sass"
import * as outage_data from "../../../data/outage-config"
import * as oa_data from "../../../data/outage-announcement"
import * as site_data from "../../../data/sites"
import { convertTimeZone } from "../../../helpers"
import { Tabs } from "../../atoms"
const moment = require("moment-timezone")

class Outage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allSubcategories: outage_data.subcategories,
      allSkills: [],
      regions: [],
      visibleSubcategories: outage_data.subcategories,
      visibleSkills: [],
      timezones: [],
      agents_impacted: undefined,
      agents_total: undefined,
      outage_started: false,
      previous_updates: [],
      title: "",
      status: "",
      severity: "",
      description: "",
      categories: [],
      subcategories: [],
      sites: [],
      skills: [],
      updates: [],
      latest_update: "",
      oa_config: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      start_time: {
        local: "",
        pt: "",
        ms_utc: undefined
      },
      end_time: {
        local: "",
        pt: "",
        ms_utc: undefined
      },
      escalation_time: {
        local: "",
        pt: "",
        ms_utc: undefined
      },
      oa_start_time: {
        local: "",
        pt: "",
        ms_utc: undefined
      },
      oa_end_time: {
        local: "",
        pt: "",
        ms_utc: undefined
      },
      time_enabled: true
    }
    this.setMetricCategories = this.props.setMetricCategories?.bind(this)
  }

  componentDidMount() {
    this.createSkillsMap()
    this.createTimeZoneMap()
    this.createOAMap()
    if (this.props.type === "existing") {
      this.setState(this.props.data)
      this.renderPreviousUpdates(this.props.data)
    }
  }

  createTimeZoneMap() {
    // Create an array of the timezones to be used in selection below
    let tz_list = moment.tz.names()
    let timezones = []

    tz_list = [...new Set(tz_list)]
    tz_list.sort()
    tz_list.forEach(timezone => {
      let tzOption = {
        key: timezone,
        text: timezone,
        value: timezone
      }
      timezones.push(tzOption)
    })
    this.setState({ timezones })
  }

  createOAMap() {
    let name_map = []
    oa_data.message_map.forEach(message => {
      let name = Object.assign({}, message)
      name.text = message.value
      name_map.push(name)
    })
    this.setState({ name_map })
  }

  createSkillsMap() {
    // Create an array of the skills to be used in selection below
    // We create this instead of hardcoding it, so that if a new skills is created, or a skill removed
    // We can just update the skills arrays of each of the sites in root/client/src/data/sites/
    let skillsArray = []
    let allSkills = []
    Object.keys(site_data.data).forEach(key => {
      let item = site_data.data[key]
      let skills = item.skills
      skillsArray = [...skills, ...skillsArray]
    })
    skillsArray = [...new Set(skillsArray)]
    skillsArray.sort()
    skillsArray.forEach(skill => {
      let skillOption = {
        key: skill,
        text: skill,
        value: skill
      }
      allSkills.push(skillOption)
    })
    this.setState({ allSkills, visibleSkills: allSkills })
  }

  updateCategory = (e, data) => {
    if (data.value.length) {
      let visibleSubcategories = []
      data.value.forEach(value => {
        let subcategories = this.state.allSubcategories.filter(item => item.category === value)
        visibleSubcategories = [...visibleSubcategories, ...subcategories]
      })
      this.setState({ visibleSubcategories, categories: data.value })
    } else this.setState({ selectedCategories: [], visibleSubcategories: this.state.allSubcategories, categories: [] })
  }

  updateSiteSelection = (e, data) => {
    let allSkills = [...this.state.allSkills]
    let skillsOfSelectedSites = []
    let timezone
    data.value.forEach(value => {
      site_data.data[value].skills.forEach(skill => skillsOfSelectedSites.push(skill))
      timezone = site_data.data[value].timezone
    })
    let visibleSkills = allSkills.filter(item => skillsOfSelectedSites.indexOf(item.key) >= 0)
    let skills = [...new Set(visibleSkills.map(skill => skill.key))]
    this.setState({ visibleSkills, sites: data.value, skills, timezone })
  }

  renderPreviousUpdates = data => {
    let items = [
      <div name="Original Description">
        <p>{data.description}</p>
        <span>{`Created by ${data.creator} ${data.created_at ? `at ${convertTimeZone(data.created_at, "UTC", "America/Los_Angeles")} PT` : ""}`} </span>
      </div>
    ]
    data.updates?.forEach((update, index) => {
      items.push(
        <div name={`Update #${index + 1}`}>
          <p>{update.text}</p>
          <span>{`Sent ${update.timestamp_ms_utc ? `at ${convertTimeZone(update.timestamp_ms_utc, "UTC", "America/Los_Angeles")} PT` : ""} by ${update.updater}`}</span>
        </div>
      )
    })
    let previous_updates = <Tabs>{items}</Tabs>
    this.setState({ previous_updates })
  }

  handleDateTime = (e, data, selectedTimeSetting) => {
    let selectedTime = data.value
    let time = {}
    if (selectedTime !== "") {
      let ms_utc = convertTimeZone(selectedTime, this.state.timezone, "UTC", true)
      let PDDateTime = convertTimeZone(selectedTime, this.state.timezone, "America/Los_Angeles")
      time[selectedTimeSetting] = {
        local: selectedTime,
        pt: PDDateTime + " PT",
        ms_utc
      }
    } else {
      time[selectedTimeSetting] = {
        local: "",
        pt: "",
        ms_utc: undefined
      }
    }
    this.setState(time)
  }

  // Uses computer local time instead of Timezone used in above function
  handleOATime = (e, data, selectedTimeSetting) => {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    let selectedTime = data.value
    let time = {}
    if (selectedTime !== "") {
      let ms_utc = convertTimeZone(selectedTime, timezone, "UTC", true)
      let PTDateTime = convertTimeZone(selectedTime, timezone, "America/Los_Angeles")
      time[selectedTimeSetting] = {
        local: selectedTime,
        pt: PTDateTime,
        ms_utc
      }
    } else {
      time[selectedTimeSetting] = {
        local: "",
        pt: "",
        ms_utc: undefined
      }
    }
    this.setState(time)
  }

  handleTimeZoneChange = (e, data, use_local) => {
    e.preventDefault() // For some reason the button triggers submit
    let timezone = use_local ? Intl.DateTimeFormat().resolvedOptions().timeZone : data.value
    let times = ["start_time", "end_time", "escalation_time"]
    let state = {
      timezone
    }
    times.forEach(time => {
      let ms_utc = this.state[time].ms_utc
      let local = convertTimeZone(ms_utc, "UTC", timezone)
      let pt = convertTimeZone(ms_utc, "UTC", "America/Los_Angeles") + " PT"
      state[time] = {
        local,
        pt,
        ms_utc
      }
    })
    this.setState(state)
  }

  handleSubmit = (e, data, outage_started, send_alert) => {
    e.preventDefault()

    const outageData = {
      title: this.state.title,
      status: this.state.status,
      severity: this.state.severity,
      description: this.state.description,
      categories: this.state.categories,
      subcategories: this.state.subcategories,
      sites: this.state.sites,
      skills: this.state.skills,
      oa_config: this.state.oa_config,
      timezone: this.state.timezone,
      start_time_ms_utc: parseInt(this.state.start_time.ms_utc) || null, // Why does Number() return 0 for "" ??
      end_time_ms_utc: parseInt(this.state.end_time.ms_utc) || null,
      escalation_time_ms_utc: parseInt(this.state.escalation_time.ms_utc) || null,
      oa_start_time_ms_utc: parseInt(this.state.oa_start_time.ms_utc) || null,
      oa_end_time_ms_utc: parseInt(this.state.oa_end_time.ms_utc) || null,
      outage_started: outage_started ? true : this.state.outage_started,
      agents_impacted: this.state.agents_impacted || null,
      agents_total: this.state.agents_total || null,
      latest_update: this.state.latest_update,
      updates: this.state.updates,
      id: this.state.id,
      kb_link: this.state.kb_link,
      regions: this.state.regions,
      send_alert
    }

    if (!this.props.type === "existing") delete outageData.id
    if ((send_alert && this.state.outage_started && !this.state.latest_update) || (send_alert && !this.state.description)) {
      document.getElementsByTagName("textarea")[0].style.border = "1px solid red"
      return
    }

    fetch("/api/outage", {
      method: this.props.type === "existing" ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(outageData)
    })
      .then(res => (res.ok ? res.json() : null))
      .then(res => {
        if (res) {
          document.location.href = "/outage/" + res.id
        } else console.log("Sorry, something went wrong")
      })
  }

  render() {
    const {
      visibleSubcategories,
      categories,
      visibleSkills,
      start_time,
      end_time,
      escalation_time,
      oa_start_time,
      oa_end_time,
      oa_config,
      timezone,
      timezones,
      kb_link,
      title,
      status,
      sites,
      description,
      severity
    } = this.state
    return (
      <div id="new-outage">
        {this.props.type === "existing" ? null : <h2>New Outage</h2>}
        <Form onSubmit={this.handleSubmit}>
          <div className="align">
            <h3>Title</h3>
            <Input placeholder="Outage Title" onChange={(e, data) => this.setState({ title: data.value })} value={title} />
          </div>
          <Segment vertical>
            <div>
              <h3>Status</h3>
              <Dropdown
                placeholder="Outage Status"
                fluid
                selection
                clearable
                closeOnBlur
                onChange={(e, data) => this.setState({ status: data.value })}
                options={outage_data.status}
                value={status}
              />
            </div>
            <div>
              <h3>Severity</h3>
              <Dropdown
                placeholder="Outage Severity"
                fluid
                selection
                clearable
                closeOnBlur
                onChange={(e, data) => this.setState({ severity: data.value })}
                options={outage_data.severity}
                value={severity}
              />
            </div>
          </Segment>
          <Segment vertical>
            <div>
              <h3>Outage Type</h3>
              <Dropdown
                placeholder="Outage Type"
                fluid
                selection
                clearable
                multiple
                closeOnBlur
                onChange={this.updateCategory}
                options={outage_data.categories}
                value={categories}
              />
            </div>
            <div>
              {categories?.length > 0 && (
                <>
                  <h3>Affected Platforms or Services</h3>
                  <Dropdown
                    placeholder="Platforms or Services"
                    fluid
                    selection
                    clearable
                    closeOnBlur
                    multiple
                    onChange={(e, data) => this.setState({ subcategories: data.value })}
                    value={this.state.subcategories}
                    options={visibleSubcategories}
                  />
                </>
              )}
            </div>
          </Segment>
          {categories.length && categories.indexOf("Customer Service or Tools") < 0 ? (
            <Segment vertical>
              <div>
                <h3>Affected Regions</h3>
                <Dropdown
                  placeholder="Affected Regions"
                  fluid
                  selection
                  search
                  clearable
                  closeOnBlur
                  multiple
                  onChange={(e, data) => this.setState({ regions: data.value })}
                  value={this.state.regions}
                  options={outage_data.regions}
                />
              </div>
            </Segment>
          ) : categories.indexOf("Customer Service or Tools") >= 0 ? (
            <>
              <Segment vertical>
                <div>
                  <h3>Affected Sites</h3>
                  <Dropdown
                    placeholder="Affected Sites (type to search)"
                    fluid
                    selection
                    search
                    clearable
                    closeOnBlur
                    multiple
                    onChange={this.updateSiteSelection}
                    options={site_data.options}
                    value={sites}
                  />
                </div>
                <div>
                  <h3>Affected Skills / Languages</h3>
                  <Dropdown
                    placeholder="Affected Skills / Languages (type to search)"
                    noResultsMessage="Select a site first"
                    fluid
                    selection
                    search
                    clearable
                    closeOnBlur
                    multiple
                    onChange={(e, data) => this.setState({ skills: data.value })}
                    value={this.state.skills}
                    options={visibleSkills}
                  />
                </div>
              </Segment>
              <Segment vertical>
                <div>
                  <h3>Affected Agents</h3>
                  <Input type="number" placeholder="Affected agents" value={this.state.agents_impacted} onChange={(e, data) => this.setState({ agents_impacted: data.value })} />
                </div>
                <div>
                  <h3>Total Agents</h3>
                  <Input type="number" placeholder="Total agents" value={this.state.agents_total} onChange={(e, data) => this.setState({ agents_total: data.value })} />
                </div>
              </Segment>
            </>
          ) : null}
          {!this.state.outage_started ? (
            <div className="align">
              <h3>Description</h3>
              <TextArea
                placeholder="A brief description of the issue, using words and phrases common to the CS network."
                onChange={(e, data) => {
                  document.getElementsByTagName("textarea")[0].style.border = "1px solid rgba(34,36,38,.15)"
                  this.setState({ description: data.value })
                }}
                value={description}
              />
            </div>
          ) : (
            <>
              <div className="align update">
                {this.state.previous_updates}
                <h3>New Update</h3>
                <TextArea
                  placeholder="A brief description of the issue, using words and phrases common to the CS network."
                  onChange={(e, data) => {
                    document.getElementsByTagName("textarea")[0].style.border = "1px solid rgba(34,36,38,.15)"
                    this.setState({ latest_update: data.value })
                  }}
                  value={this.state.latest_update}
                />
              </div>
            </>
          )}
          <div className="align" style={{ marginTop: "25px" }}>
            <h3>KB Post Link</h3>
            <Input placeholder="KB Post Link" onChange={(e, data) => this.setState({ kb_link: data.value })} value={kb_link} />
          </div>
          <div id="time" className={this.state.time_enabled ? "opened" : ""}>
            <h3 onClick={() => this.setState({ time_enabled: !this.state.time_enabled })}>
              Outage Times
              <Icon name={this.state.time_enabled ? "minus" : "plus"} />
            </h3>
            <div className="align inline" style={{ marginTop: "25px" }}>
              <h3>Use Timezone:</h3>
              <Dropdown placeholder="Applicable Timezone" fluid selection search closeOnBlur onChange={this.handleTimeZoneChange} value={timezone} options={timezones} />
              <Button onClick={(e, data) => this.handleTimeZoneChange(e, data, true)}>Use my local time</Button>
            </div>
            <Segment vertical>
              <div>
                <h3>Issue start time</h3>
                <DateTimeInput
                  preserveViewMode={false}
                  clearable
                  dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                  name="startTime"
                  placeholder={this.state.timezone}
                  iconPosition="left"
                  value={start_time.local}
                  autoComplete="off"
                  onChange={(e, data) => this.handleDateTime(e, data, "start_time")}
                />
                <DateTimeInput
                  preserveViewMode={false}
                  disabled
                  dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                  name="startTime"
                  placeholder="PD Time (Automatic)"
                  iconPosition="left"
                  onChange={() => null}
                  value={start_time.pt}
                />
              </div>
              <div>
                <h3>First escalation time</h3>
                <DateTimeInput
                  preserveViewMode={false}
                  clearable
                  dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                  name="startTime"
                  placeholder={this.state.timezone}
                  iconPosition="left"
                  autoComplete="off"
                  value={escalation_time.local}
                  onChange={(e, data) => this.handleDateTime(e, data, "escalation_time")}
                />
                <DateTimeInput
                  preserveViewMode={false}
                  disabled
                  dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                  name="startTime"
                  placeholder="PD Time (Automatic)"
                  iconPosition="left"
                  onChange={() => null}
                  value={escalation_time.pt}
                />
              </div>
            </Segment>
            <Segment vertical>
              <div>
                <h3>Issue end time</h3>
                <DateTimeInput
                  preserveViewMode={false}
                  clearable
                  dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                  name="startTime"
                  placeholder={this.state.timezone}
                  iconPosition="left"
                  autoComplete="off"
                  value={end_time.local}
                  onChange={(e, data) => this.handleDateTime(e, data, "end_time")}
                />
                <DateTimeInput
                  preserveViewMode={false}
                  disabled
                  dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                  name="startTime"
                  placeholder="PD Time (Automatic)"
                  iconPosition="left"
                  onChange={() => null}
                  value={end_time.pt}
                />
              </div>
            </Segment>
          </div>
          <div id="oa" className={this.state.oa_enabled ? "opened" : ""}>
            <div className="align" style={{ marginTop: "25px" }}>
              <h3 onClick={() => this.setState({ oa_enabled: !this.state.oa_enabled })}>
                OA Configuration <Icon name={this.state.oa_enabled ? "minus" : "plus"} floated="right" />
              </h3>
              <Dropdown
                placeholder="Select by message name (type to search)"
                fluid
                search
                selection
                clearable
                closeOnBlur
                value={oa_config}
                onChange={(e, data) => {
                  this.setState({ oa_config: data.value })
                }}
                options={this.state.name_map}
              />
            </div>
            <Segment vertical>
              <div>
                <h3>OA Activation Time</h3>
                <DateTimeInput
                  preserveViewMode={false}
                  clearable
                  dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                  name="startTime"
                  placeholder={Intl.DateTimeFormat().resolvedOptions().timeZone}
                  iconPosition="left"
                  autoComplete="off"
                  value={oa_start_time.local}
                  onChange={(e, data) => this.handleOATime(e, data, "oa_start_time")}
                />
                <DateTimeInput
                  preserveViewMode={false}
                  disabled
                  dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                  name="startTime"
                  placeholder="PD Time (Automatic)"
                  iconPosition="left"
                  onChange={() => null}
                  value={oa_start_time.pt}
                />
              </div>
              <div>
                <h3>OA End Time</h3>
                <DateTimeInput
                  preserveViewMode={false}
                  clearable
                  dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                  name="startTime"
                  autoComplete="off"
                  placeholder={Intl.DateTimeFormat().resolvedOptions().timeZone}
                  iconPosition="left"
                  value={oa_end_time.local}
                  onChange={(e, data) => this.handleOATime(e, data, "oa_end_time")}
                />
                <DateTimeInput
                  preserveViewMode={false}
                  disabled
                  dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                  name="startTime"
                  placeholder="PD Time (Automatic)"
                  iconPosition="left"
                  onChange={() => null}
                  value={oa_end_time.pt}
                />
              </div>
            </Segment>
          </div>
          <Segment vertical id="buttons">
            {this.props.type === "existing" ? (
              <>
                <Button color="red" onClick={(e, data) => this.handleSubmit(e, data, true, true)}>
                  {this.state.outage_started ? "Send Update" : "Send Alert"}
                </Button>
                <Button color="green" type="submit">
                  Save Update
                </Button>
              </>
            ) : (
              <>
                <Button color="green">Save for review</Button>
                <div className="spacer"></div>
              </>
            )}

            <Button
              color="yellow"
              onClick={() => {
                this.props.type === "existing" ? document.location.reload() : (document.location = "/")
              }}
            >
              {this.props.type === "existing" ? "Discard Changes" : "Cancel"}
            </Button>
          </Segment>
        </Form>
      </div>
    )
  }
}

export default Outage
