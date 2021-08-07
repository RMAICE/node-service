export default class ValidatorError extends Error {
  /**
   * @param {object} [conf]
   * @param {string} [conf.message=Request fields validation error]
   * @param {number} [conf.errorCode=3000]
   * @param {number} [conf.status=500] - http status code
   */
  constructor(conf = {}) {
    const { message = 'Request fields validation error', errorCode = 4000, status = 400 } = conf
    super(message)
    this.errorCode = errorCode
    this.status = status
  }
}
