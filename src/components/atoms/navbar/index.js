import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon, Input } from "semantic-ui-react"
import "./styles.sass"

export default function Navbar(props) {
  const [user, updateUser] = useState(undefined)
  const [outage, updateOutage] = useState(undefined)

  useEffect(() => {
    if (!user) {
      fetch("/api/me", {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" }
      })
        .then(res => (res.ok ? res.json() : null))
        .then(res => {
          if (res) updateUser(res)
        })
    }
  })

  const handleNavigation = () => {
    if (outage) document.location.href = "/outage/" + outage
  }

  return (
    <header>
      <div className="nav-icon"></div>
      <h3 onClick={() => (document.location.href = "/")}>Outage Dashboard</h3>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/new"}>New Outage</Link>
        </li>
        <li>
          <Link to={"/status"}>Status Page</Link>
        </li>

        <li>
          <Link to={"/oa"}>Outage Announcement</Link>
        </li>
        <li>
          <Link to={"/outages"}>Past Outages</Link>
        </li>
        <li className="goto">
          Go to outage:
          <Input placeholder="#" type="number" onChange={(e, data) => updateOutage(data.value)} />
          <Icon name="arrow alternate circle right" onClick={handleNavigation} />
        </li>
      </ul>
      <div id="user">
        <Icon name="user" />
        <p>{user?.email}</p>
      </div>
    </header>
  )
}
