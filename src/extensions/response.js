/**
 * @openapi
 * components:
 *   schemas:
 *     Success:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *           example: success
 *         data:
 *           type: object
 *     Error:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *           example: error
 *         error:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: error message text
 *             error_code:
 *               type: number
 *               description: error code
 */

export function success(data = {}) {
  return this.status(200).json({ result: 'success', data }).end()
}

export function fail(error) {
  return this.status(error.status)
    .json({ result: 'fail', data: { message: error.message, error_code: error.errorCode } })
    .end()
}
