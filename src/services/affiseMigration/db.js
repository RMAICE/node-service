import knex from 'knex'
import { pg } from '../../config/index.js'

const db = knex({
  client: 'pg',
  connection: pg
})

db.schema.raw('SELECT 1+1').catch((err) => {
  console.error(err)
  process.exit(1)
})

export default db
