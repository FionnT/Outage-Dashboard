const moment = require("moment-timezone")

const convertTimeZone = (datetime, from, to, return_ms) => {
  let inputTimezone
  let outputTimezone

  // console.log("1", datetime, from, to)
  if (datetime) {
    datetime = datetime.toString()
    // console.log("2", datetime)
    if (datetime.indexOf("-") < 0 && datetime.indexOf("/") < 0) {
      inputTimezone = moment(datetime, "x").utc().format()
    } else inputTimezone = moment.tz(datetime, from).format()

    // console.log("4", inputTimezone)
    if (return_ms) outputTimezone = new Date(inputTimezone).getTime()
    else outputTimezone = moment(inputTimezone).tz(to).format("YYYY-MM-DD HH:mm:ss")
    // console.log("5", outputTimezone)

    return outputTimezone
  } else return ""
}

export default convertTimeZone
