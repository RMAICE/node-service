import promClient from 'prom-client'
import affiseMigrationDb from '../services/affiseMigration/db.js'

const register = promClient.register

class prometheus {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async metrics(req, res) {
    try {
      promClient.collectDefaultMetrics()
      res.set('Content-Type', register.contentType)
      res.end(await register.metrics())
    } catch (err) {
      res.fail(err)
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async healthCheck(req, res) {
    try {
      await affiseMigrationDb.queryBuilder().select('1+1')
      res.success({ message: 'App is alive' })
    } catch (err) {
      res.fail(err)
    }
  }
}

export default prometheus
