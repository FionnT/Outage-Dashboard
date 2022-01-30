import React from "react"
import { convertTimeZone } from "../../../helpers"
import "./styles.sass"

function OutageCard(props) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return (
    <div id="columns" className="actionable" onClick={() => (document.location.href = "/outage/" + props.id)}>
      <div className="ref">
        <p>{props.id}</p>
      </div>
      <div className="status">
        <p>{props.status}</p>
      </div>
      <div className="severity">
        <p>{props.severity}</p>
      </div>
      <div className="title">
        <p>{props.title}</p>
      </div>
      <div className="desc">
        <p>{props.description}</p>
      </div>
      <div className="start">
        <p>{convertTimeZone(props.start_time_ms_utc, "America/Los_Angeles", userTimeZone).replace("T", " ")}</p>
      </div>
      <div className="end">
        <p>{convertTimeZone(props.end_time_ms_utc, "America/Los_Angeles", userTimeZone).replace("T", " ")}</p>
      </div>
    </div>
  )
}

export default OutageCard
