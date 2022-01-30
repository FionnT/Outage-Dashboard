const convertTimeZone = require("../helpers/convert-timezone")
const path = require("path")
const nodemailer = require("nodemailer")
const pug = require("pug")

// Local
const env = process.env.NODE_ENV || "test"
const emailhost = "mailrelay.website.com"
const emailport = 25
const emailTemplate = path.join(__dirname, "../emails/system-alert.pug")

const sendAlertEmail = data => {
  let emailData = Object.assign({}, data)

  // Convert times back to PT
  let times = ["start_time", "end_time", "oa_start_time", "oa_end_time", "escalation_time"]
  times.forEach(time => {
    let timeString = time + "_ms_utc"
    let ms_utc = data[timeString]
    if (ms_utc) {
      try {
        emailData[time] = convertTimeZone(ms_utc, "UTC", "America/Los_Angeles")
      } catch (err) {
        emailData[time] = null
      }
    }
    delete emailData[timeString]
  })

  const html = pug.renderFile(emailTemplate, emailData)


  const sendEmailTo = () => {
    let emailAddress = "defaultsafeemail@website.com"
    if (env === "test") {
      if (emailData.updater) emailAddress = `${emailData.updater}`
      else if (emailData.creator) emailAddress = `${emailData.updater}`
    } else if (env === "prod") emailAddress = "mailinglist@website.com"

    return emailAddress.toString()
  }

  const mailOptions = {
    to: sendEmailTo(),
    from: "mailinglist@website.com",
    replyTo: "mailinglist@website.com",
    subject: `[System Alert - ${emailData.categories.toString().replace(/,/g, ", ")}] ${emailData.severity} | ${emailData.title}`,
    html
  }

  const emailer = nodemailer.createTransport({ host: emailhost, port: emailport, secure: false, tls: { rejectUnauthorized: false } })
  emailer.sendMail(mailOptions)
}

module.exports = sendAlertEmail
