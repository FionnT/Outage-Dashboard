const express = require("express")
const app = express()
const port = 4002

app.set("views", "../emails")
app.set("view engine", "pug")

app.listen(port, () => console.log(`Running on port ${port}!`))

let sample_system_alert = {
  title: "",
  status: "",
  severity: "",
  description: "",
  update: "",
  categories: [""],
  subcategories: [""],
  sites: [""],
  skills: [],
  timezone: "",
  outage_started: true,
  agents_impacted: "",
  updater: "",
  id: "",
  start_time: "",
  end_time: "",
  escalation_time: "",
  kb_link: "",
}

app.use("/", async (req, res) => {
  res.render("system-alert", sample_system_alert)
})

app.get("*", function (req, res) {
  res.redirect("/404")
})
