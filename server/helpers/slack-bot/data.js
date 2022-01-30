const mainMessage = {
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: " "
      }
    }, // Adds padding to the message
    {
      type: "section",
      text: {
        type: "mrkdwn",
        // To tag people, use <@U02FQQBA6F4> where U02FQQBA6F4 is the User ID
        text: "Sorry, something went wrong."
      }
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Open Alert",
            emoji: true
          },
          value: "click_me_123",
          url: "https://google.com",
          action_id: "button-action"
        }
      ]
    }
  ]
}

const emojiMap = {
  new: "exclamation",
  update: "ps-check",
  stable: "update",
  resolved: "ss-check"
}

module.exports = { mainMessage, emojiMap }
