import AffiseMigrationDbService, { AffiseMigrationDbServiceError } from './affiseMigration/affiseMigrationDbService.js'
import AffiseApi, { AffiseApiServiceError } from './affiseApi.js'

export class ClickContextHelperError extends Error {
  /**
   * @param {object} conf
   * @param {string} [conf.message=Click context error]
   * @param {number} [conf.errorCode=2000]
   * @param {number} [conf.status=500]
   */
  constructor(conf = {}) {
    const { message = 'Click context error', errorCode = 2000, status = 500 } = conf
    super(message)
    this.errorCode = errorCode
    this.status = status
  }
}

class ClickContextHelper {
  constructor() {
    this.affiseMigrationService = new AffiseMigrationDbService()
    this.affiseApi = new AffiseApi()
  }

  /**
   * @param {string} id
   * @returns {Promise<object>}
   */
  async getClickContext(id) {
    let click

    try {
      click = await this.affiseMigrationService.clickFinder(id)
      if (click) return this.transferResult(click)
    } catch (err) {
      if (err instanceof AffiseMigrationDbServiceError) throw err
      console.error(err)
      throw new ClickContextHelperError({ errorCode: 2002, message: 'Resolving click from affise_migration db error' })
    }

    try {
      click = await this.affiseApi.clickFinder(id)
      if (click) return this.resolveClickFromAffise(click)
    } catch (err) {
      if (err instanceof AffiseApiServiceError || err instanceof AffiseMigrationDbServiceError) throw err
      console.error(err)
      throw new ClickContextHelperError({ errorCode: 2001, message: 'Resolving click from affise error' })
    }

    try {
      if (!click) return this.transferResult(click)
    } catch (err) {
      if (err instanceof AffiseMigrationDbServiceError) throw err
      console.error(err)
      throw new ClickContextHelperError({ errorCode: 2003, message: 'Resolving no transfer error' })
    }
  }

  /**
   * @private
   * @param {object} click
   * @param {object} click.click_id conversion id
   * @param {number} click.offer_id
   * @param {number} click.partner_id
   * @returns {Promise<object>}
   */
  async transferResult(click = {}) {
    const transfers = await this.affiseMigrationService.transferFinder({ active: true })
    const transferOnlyPartnerAndOffer = transfers.find(
      (t) => String(t.offer_id) === String(click.offer_id) && String(t.partner_id) === String(click.partner_id)
    )
    const transferOnlyOffer = transfers.find((t) => String(t.offer_id) === String(click.offer_id))
    const transferOnlyPartner = transfers.find((t) => String(t.partner_id) === String(click.partner_id))
    let result = {
      click_id: click.click_id,
      offer_id: click.offer_id,
      partner_id: click.partner_id,
      transfer: true
    }

    if (transferOnlyPartnerAndOffer) return result
    if (transferOnlyOffer) return result
    if (transferOnlyPartner) return result

    result.transfer = false

    return result
  }

  /**
   * @param {object} click click from affise api
   * @returns {Promise<object>}
   */
  async resolveClickFromAffise(click) {
    const migrationDbClick = await this.affiseMigrationService.clickFinder(click.click_id)
    try {
      if (!migrationDbClick) await this.affiseMigrationService.createClick(click)
    } catch (err) {} // ignore create error
    return this.transferResult(click)
  }
}

export default ClickContextHelper
