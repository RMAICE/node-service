import ClickContextService from '../services/clickContext.js'

export default class ClickContextController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import('express').NextFunction} next
   * @returns {Promise}
   */
  async transferClick(req, res, next) {
    try {
      const clickContext = new ClickContextService()
      return res.success(await clickContext.getClickContext(req.query.click_id))
    } catch (err) {
      next(err)
    }
  }
}
