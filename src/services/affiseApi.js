import { AffiseApiKey } from '../config/index.js'
import axios from 'axios'

export class AffiseApiServiceError extends Error {
  /**
   * @param {object} [conf]
   * @param {string} [conf.message=Affise api error]
   * @param {number} [conf.errorCode=1000]
   * @param {number} [conf.status=500]
   */
  constructor(conf = {}) {
    const { message = 'Affise api error', errorCode = 1000, status = 500 } = conf
    super(message)
    this.errorCode = errorCode
    this.status = status
  }
}

class AffiseApiService {
  static AFFISE_TIMEOUT = 15 * 1000

  /**
   * @param {string} id
   * @returns {Promise<object>} click row from database
   */
  clickFinder(id) {
    return axios
      .get(`http://api.alfaleads.affise.com/3.0/stats/click/${id}?API-key=${AffiseApiKey}`, { timeout: AffiseApiService.AFFISE_TIMEOUT })
      .then(({ data }) => this.transformAffiseClick(data.click))
      .catch((err) => {
        const { response } = err
        console.error(err)
        if (err.code === 'ECONNABORTED' || (response.status >= 500 && response.status <= 599))
          throw new AffiseApiServiceError({ errorCode: 1103, message: 'Affise availability error', status: 500 })
        // expecting "click not found" error
        if (response.status === 400 && response.data.status === 2) return
        if (response.status === 403 && response.data.status === 2)
          throw new AffiseApiServiceError({ errorCode: 1002, message: 'Affise api token error', status: 500 })
        throw new AffiseApiServiceError()
      })
  }

  /**
   * @param {object} click
   * @returns {object}
   */
  transformAffiseClick(click) {
    const result = {}
    result.click_id = click.click_id
    result.offer_id = parseInt(String(click.offer.id)).toString()
    result.partner_id = parseInt(String(click.partner.id)).toString()
    result.ip = click.ip
    result.au = click.ua
    result.connection_type = click.connection_type
    result.landing_id = parseInt(String(click.landing.id)).toString()
    result.prelanding_id = parseInt(String(click.prelanding.id)).toString()
    result.referrer = click.referrer
    result.sub1 = click.sub1
    result.sub2 = click.sub2
    result.sub3 = click.sub3
    result.sub4 = click.sub4
    result.sub5 = click.sub5
    result.sub6 = click.sub6
    result.sub7 = click.sub7
    result.sub8 = click.sub8
    result.conversion_id = parseInt(String(click.conversion_id)).toString()
    result.created_at = click.created_at
    result.isp_code = click.isp_code
    result.uniq = click.uniq ? 1 : 0
    return result
  }
}

export default AffiseApiService
