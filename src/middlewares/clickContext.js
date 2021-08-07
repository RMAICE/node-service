import { validateGetClickContext } from '../validators/clickContext.validator.js'
import ValidatorError from '../validators/validatorError.js'

export default class clickContextMiddleWares {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  getClickContext(req, res, next) {
    const { error } = validateGetClickContext(req.query)
    if (error) return next(new ValidatorError({ message: error.message }))
    next()
  }
}
