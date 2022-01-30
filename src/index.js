import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route } from "react-router-dom"
import reportWebVitals from "./reportWebVitals"
import "semantic-ui-css/semantic.min.css"

// local
import { organisms } from "./components"
import "./styles/global.sass"

const Router = () => {
  const [pageTitle, updateTitle] = useState("Outage Dashboard")

  useEffect(() => {
    document.title = pageTitle
  })

  return (
    <>
      <BrowserRouter>
        <Route exact path="/" render={props => <organisms.Home updateTitle={updateTitle} {...props} />} />
        <Route exact path="/status" render={props => <organisms.Status updateTitle={updateTitle} {...props} />} />
        <Route exact path="/oa" render={props => <organisms.OutageAnnouncementPage updateTitle={updateTitle} {...props} />} />
        <Route exact path="/outage-announcement" render={props => <organisms.OutageAnnouncementPage updateTitle={updateTitle} {...props} />} />
        <Route exact path="/mcp" render={props => <organisms.MCP updateTitle={updateTitle} {...props} />} />
        <Route exact path="/new" render={props => <organisms.NewOutage updateTitle={updateTitle} {...props} />} />
        <Route exact path="/outage/:id" render={props => <organisms.ExistingOutage updateTitle={updateTitle} {...props} />} />
        <Route exact path="/outages" render={props => <organisms.OutageList updateTitle={updateTitle} {...props} />} />
      </BrowserRouter>
    </>
  )
}

ReactDOM.render(<Router />, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
