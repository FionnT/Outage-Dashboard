import React from "react"

export default function Frame(props) {
  return <iframe style={{ width: "100%", height: "100vh" }} frameBorder="0" marginHeight="0" marginWidth="0" title={props.title} src={props.url}></iframe>
}
