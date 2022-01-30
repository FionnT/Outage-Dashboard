import React, { useEffect } from "react"
import { Navbar } from "../../atoms"
import { Outage } from "../../molecules"
import { Segment } from "semantic-ui-react"

export default function NewOutage(props) {
  useEffect(() => {
    props.updateTitle("New Outage")
  })
  return (
    <>
      <Navbar />
      <Segment style={{ width: "65vw", margin: "0 auto" }}>
        <Outage type="new" />
      </Segment>
    </>
  )
}
