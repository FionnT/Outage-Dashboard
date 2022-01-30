// Full Page version of the OA Tool
import React, { useEffect } from "react"
import OutageAnnouncement from "../../molecules/outage-announcement"
import { Navbar } from "../../atoms"

export default function OutageAnnouncementPage(props) {
  const updateTitle = props.updateTitle.bind(this)
  useEffect(() => {
    updateTitle("Outage Announcement")
  })
  return (
    <>
      <Navbar />
      <OutageAnnouncement title="Outage Announcement" />
    </>
  )
}
