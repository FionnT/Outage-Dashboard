const makePoolQuery = require("../helpers/db-connect")
const sendAlertEmail = require("../helpers/send-alert-email.js")
const sendToSlack = require("../helpers/slack-bot")
const env = process.env.NODE_ENV || "test"

const updateOutage = async (req, res) => {
  let json = req.body
  let sendAlert = json.send_alert
  let id = json.id
  let update

  json.updater = req.headers.oidc_claim_sub || null

  const fields = []
  const values = []

  // Handle updates that are to be sent
  if (json.latest_update && sendAlert) {
    json.updates.push({ text: json.latest_update, timestamp_ms_utc: new Date().getTime(), updater: json.updater })
    update = json.latest_update
    json.latest_update = null
  }

  // Remove ID and send_alert fields as these are not intended to be updated/stored
  delete json.id
  delete json.send_alert

  Object.keys(json).forEach((key, index) => {
    fields.push(`${key.toLowerCase()} = ($${Number(index + 1)})`)
    values.push(json[key])
  })

  const query = {
    text: `UPDATE ${env} set ${fields.toString()} where id = ${id} returning id`,
    values
  }

  try {
    let result = await makePoolQuery(query)
    if (result && sendAlert) {
      // We need to re-add these so they appear in the email
      json.id = id
      json.update = update
      sendAlertEmail(json)

      switch (env) {
        case "test":
          sendToSlack(json, "C02E5PPJ18W") // #t3devs
          break
        case "prod":
          sendToSlack(json, "CHNDGQKSN") // #t3-outage-chat
          if (json.severity.toLowerCase() === "critical") sendToSlack(json, "C01SMKRQF1A") // #cs-outage-bridge
          break
        default:
          break
      }
    }
    res.json(result.rows[0])
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

module.exports = updateOutage
