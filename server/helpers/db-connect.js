const { Pool } = require("pg")


let _pool

async function getPool() {
  if (!_pool) {
    _pool = new Pool({
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "InsertDatabasePasswordHere",
      max: 20,
      idleTimeoutMillis: 2000,
      connectionTimeoutMillis: 30000,
      allowExitOnIdle: true
    })
  }

  // If you don't declare these error handlers if the pool and client are disconected
  // they will throw an execption that is unhandled
  if (_pool.listeners("error").length === 0) {
    _pool.on("error", err => {
      console.log(err)
    })
  }

  if (_pool.listeners("connect").length === 0) {
    _pool.on("connect", client => {
      client.on("error", err => {
        console.log(err)
      })
    })
  }

  return _pool
}

async function makePoolQuery(queryString) {
  return new Promise(async (resolve, reject) => {
    const pool = await getPool()
    pool.connect((err, client, release) => {
      if (err) {
        return console.error("Error acquiring client", err.stack)
      }
      client.query(queryString, (err, result) => {
        release()
        if (err) console.log("Error executing query", err)
        resolve(result)
      })
    })
  })
}

process.on("SIGTERM", () => {
  const pool = getPool()
  pool.end()
})

module.exports = makePoolQuery
