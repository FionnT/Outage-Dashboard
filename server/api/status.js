const makePoolQuery = require("../helpers/db-connect")
const env = process.env.NODE_ENV || "test"

const status = async (req, res) => {
  const twoWeeksAgo = Date.now() - 1209600000
  const query = {
    text: `SELECT * from ${env} where status != 'Resolved' or end_time_ms_utc >= ${twoWeeksAgo}`
  }

  try {
    let results = await makePoolQuery(query)
    let categories = {
      Streaming: [],
      Gaming: [],
      Other: [],
      "Customer Service or Tools": []
    }
    results.rows.forEach(result => {
      Object.keys(categories).forEach(category => {
        if (result.categories.indexOf(category) >= 0) categories[category].push(result)
      })
    })
    res.json(categories)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

module.exports = status
