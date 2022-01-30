const makePoolQuery = require("../helpers/db-connect")
const env = process.env.NODE_ENV || "test"

const newOutage = async (req, res) => {
  let json = req.body

  json.creator = req.headers.oidc_claim_sub
  json.created_at = new Date().getTime()

  delete json.id
  delete json.sendalert
  delete json.latest_update

  const fields = []
  const values = []
  const valRefs = []

  Object.keys(json).forEach((key, index) => {
    fields.push(key)
    valRefs.push("$" + Number(index + 1))
    values.push(json[key])
  })

  const query = {
    text: `INSERT INTO ${env}(${fields.toString()}) VALUES(${valRefs.toString()}) returning ID`,
    values
  }

  try {
    let result = await makePoolQuery(query)
    res.json(result.rows[0])
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

module.exports = newOutage
