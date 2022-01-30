const makePoolQuery = require("../helpers/db-connect")
const env = process.env.NODE_ENV|| "test"

const fetchOutage = async (req, res) => {
  const { method } = req
  let query
  let result

  switch (method) {
    case "POST":
      let json = req.body
      query = {
        text: `select * from ${env} where id = ${json.id}`
      }
      try {
        result = await makePoolQuery(query)
        res.json(result.rows[0])
      } catch (err) {
        res.status(500).send(err)
      }
      return
    case "GET":
      query = {
        text: `select * from ${env} order by start_time_ms_utc desc`
      }

      try {
        result = await makePoolQuery(query)
        res.json(result.rows)
      } catch (err) {
        console.log(err)
        res.status(500).send(err)
      }
      return
    default:
      res.sendStatus(404)
      return
  }
}

module.exports = fetchOutage
