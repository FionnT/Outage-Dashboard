const moment = require("moment-timezone")

const convertTimeZone = (datetime, from, to) => {
  let inputTimezone

  if (datetime) {
    datetime = datetime.toString()

    if (!datetime.match("/") && !datetime.match("-")) {

      // Construct an ISO8601 format Datetime string from the UTC millseconds timestamp
      // Allowing support for using millseconds in this function
      // NOTE: This function differs from the frontend version
      let utcTime = new Date(Number(datetime)).toLocaleString("en-GB", { locale: "UTC", hour12: false })

      let split = utcTime.split("/")
      let d = split[0]
      let m = split[1]
      let y = split[2].split(", ")[0]
      let t = split[2].split(", ")[1]
      let isoString = y + "-" + m + "-" + d + "T" + t


      datetime = isoString
      inputTimezone = moment.utc(datetime).format()

    } else inputTimezone = moment(datetime).tz(from).format()

    let outputTimezone = moment(inputTimezone).tz(to).format("YYYY-MM-DD HH:mm:ss") + " PT"

    return outputTimezone
  } else return null
}

module.exports = convertTimeZone
