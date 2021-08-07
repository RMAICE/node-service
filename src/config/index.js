import { config } from 'dotenv'
config()

const { NODE_PORT, PG_PASS, PG_HOST, PG_USER = 'postgres', PG_DATABASE = 'affise_migration', AFFISE_API_KEY } = process.env

export const port = NODE_PORT || 3000
export const prefix = '/api/v1'
export const docsPrefix = '/docs'
export const pg = {
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASS,
  port: 5432
}
export const AffiseApiKey = AFFISE_API_KEY
export { default as swaggerConfig } from './swagger.config.js'
