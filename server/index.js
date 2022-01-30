const express = require("express"),
  compression = require("compression"),
  path = require("path"),
  serveIndex = require("serve-index")

const app = express()
const built = path.join(__dirname, "../built/")
const updateOutage = require("./api/update-outage")
const newOutage = require("./api/new-outage")
const fetchOutage = require("./api/fetch-outage")
const status = require("./api/status")

// Uses gzip compression, adds basic security headers
const jsonParser = express.json()
app.use(compression())
app.use(express.json({ strict: false, limit: 20000, type: "application/*+json" }))
app.use(
  express.urlencoded({
    extended: true
  })
)


// Routes
app.get("/api/me/", (req, res) => res.json(req.user || {}))
app.put("/api/outage", jsonParser, (req, res) => updateOutage(req, res))
app.post("/api/outage", jsonParser, (req, res) => newOutage(req, res))
app.all("/api/fetch-outage", jsonParser, (req, res) => fetchOutage(req, res))
app.get("/api/status/", (req, res) => status(req, res))

// Serves static files from the built/ directory
// If a requested file isn't found, serves built/index.html
app.use(serveIndex(built))

const server = app.listen(7101, "localhost", function () {
  console.log(`Node ${process.version}`)
  console.log("Listening on port 7101!")
})

process.on("uncaughtException", err => {
  console.log(err)
})
