import express from 'express'
import cors from 'cors'
import { prefix } from './config/index.js'
import routes from './routes/index.js'
import bodyParser from 'body-parser'
import { success, fail } from './extensions/response.js'

export default (app) => {
  app.response.success = success
  app.response.fail = fail

  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(express.static('public'))
  app.disable('x-powered-by')
  app.disable('etag')
  app.use(prefix, routes)

  app.get('/', (_req, res) => {
    return res.success({ message: 'Project is successfully working...' })
  })

  app.use((_req, _res, next) => {
    const error = new Error('Endpoint could not find!')
    error.status = 404
    next(error)
  })

  app.use((error, req, res, _next) => {
    return res.fail(error)
  })
}
