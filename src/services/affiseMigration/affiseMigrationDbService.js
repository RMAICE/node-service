import db from './db.js'

export class AffiseMigrationDbServiceError extends Error {
  /**
   * @param {object} [conf]
   * @param {string} [conf.message=Migration database error]
   * @param {number} [conf.errorCode=3000]
   * @param {number} [conf.status=500] - http status code
   */
  constructor(conf = {}) {
    const { message = 'Migration database error', errorCode = 3000, status = 500 } = conf
    super(message)
    this.errorCode = errorCode
    this.status = status
  }
}

class AffiseMigrationDbService {
  /**
   * @param {string|number} id
   * @returns {Promise<object>} click row from database
   */
  clickFinder(id) {
    return db
      .queryBuilder()
      .select(['click_id', 'offer_id', 'partner_id'])
      .where({
        click_id: id
      })
      .from('clicks')
      .first()
      .catch((err) => {
        console.error(err)
        throw new AffiseMigrationDbServiceError({ status: 500, errorCode: 3001 })
      })
  }

  /**
   * finds offer row in transfer collection
   * @param {object} where
   * @returns {Promise<object>}
   */
  transferFinder(where = {}) {
    return db
      .queryBuilder()
      .select('*')
      .where(where)
      .from('transfer_store')
      .catch((err) => {
        console.error(err)
        throw new AffiseMigrationDbServiceError({ status: 500, errorCode: 3002 })
      })
  }

  /**
   * @param {object} click
   * @returns {Promise}
   */
  createClick(click) {
    return db('clicks')
      .insert(click)
      .catch((err) => {
        console.error(err)
        if (err.code === '23505') throw new AffiseMigrationDbServiceError({ message: err.detail, status: 500, errorCode: 3003 })
        throw new AffiseMigrationDbServiceError({ message: err.message, status: 500, errorCode: 3000 })
      })
  }
}

export default AffiseMigrationDbService
