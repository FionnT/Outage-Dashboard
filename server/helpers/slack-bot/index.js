const { WebClient, LogLevel } = require("@slack/web-api")

// local
const convertTimeZone = require("../convert-timezone")
const { mainMessage, emojiMap } = require("./data.js")

const composeDetails = data => {
  let times = ["start_time", "end_time", "oa_start_time", "oa_end_time", "escalation_time"]
  times.forEach(time => {
    let timeString = time + "_ms_utc"
    let ms_utc = data[timeString]
    if (ms_utc) {
      try {
        data[time] = convertTimeZone(ms_utc, "UTC", "America/Los_Angeles")
      } catch (err) {
        data[time] = null
      }
    }
  })

  const details_map = {
    "*Affected Platforms or Services:*": data.subcategories,
    "*Regions Impacted:*": data.regions,
    "*Sites Affected:*": data.sites,
    "*Affected Skills:*": data.skills,
    "*Agents Affected:*": data.agents_impacted && data.agents_total ? `${data.agents_impacted}/${data.agents_total}` : null,
    "*KB Article:*": data.kb_link,
    "*Start Time:*": data.start_time,
    "*First Escalation Time:*": data.escalation_time,
    "*End Time:*": data.end_time,
  }

  let string = ``
  Object.keys(details_map).forEach(key => {
    if (details_map[key]?.length) {
      string = string + `${key} ${details_map[key].toString().replace(/,/g, ", ")}\n\n`
    }
  })
  return string
}

const sendToSlack = async (data, channelID) => {
  const { update, description, id, status, severity, title } = data
  const oAuthToken = "InsertOAuthTokenHere"
  const client = new WebClient(oAuthToken, { logLevel: LogLevel.DEBUG })
  const publishMessage = async settings => {
    try {
      const result = await client.chat.postMessage(settings)
      return result
    } catch (error) {
      console.error(error)
    }
  }

  // Set text of main body
  mainMessage.blocks[1].text.text = `\n\n*${title}*\n\n${update ? update : description}\n\n *Sent At:* ${convertTimeZone(
    new Date().getTime(),
    "UTC",
    "America/Los_Angeles"
  )}`
  mainMessage.blocks[2].elements[0].url = `https://outagewebsite.com/outage/${id}`
  mainMessage.blocks[2].elements[0].text.text = `Open Alert #${id}`

  const main = await publishMessage({
    token: oAuthToken,
    channel: channelID,
    blocks: mainMessage.blocks,
    username: `${status} - ${severity}`,
    text: update ? `${title}\n\n${update}` : `${title}\n\n${description}`,
    icon_emoji: emojiMap[data.status.toLowerCase()]
  })

  if (main && main.ok) {
    // Sent details of outage in threaded reply
    publishMessage({
      token: oAuthToken,
      channel: channelID,
      thread_ts: main.ts,
      icon_emoji: "mag",
      text: composeDetails(data)
    })

    // Send original description in thread
    if (update) {
      publishMessage({
        token: oAuthToken,
        channel: channelID,
        thread_ts: main.ts,
        icon_emoji: "mag",
        text: `*Original Description:* ${data.description}\n\n *Ref:* ${id}`
      })
    }
  }
}

module.exports = sendToSlack
