import { Router } from 'express'
import ClickContextController from '../controllers/clickContext.js'
import ClickContextMiddleWares from '../middlewares/clickContext.js'

const clickContextMiddleWares = new ClickContextMiddleWares()
const clickContextController = new ClickContextController()

const router = Router()

/**
 * @openapi
 * /api/v1/click-context/:
 *   get:
 *     description: returns context of click (alfanet, affise)
 *     parameters:
 *       - in: query
 *         name: click_id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of conversion to get transfer information
 *     responses:
 *       200:
 *         description: Returns object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClickContextSuccess'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', clickContextMiddleWares.getClickContext, clickContextController.transferClick)

export default router

/**
 * @openapi
 * components:
 *   schemas:
 *     ClickContextSuccess:
 *       allOf:
 *         - $ref: '#/components/schemas/Success'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 click_id:
 *                   type: string
 *                 offer_id:
 *                   type: string
 *                 partner_id:
 *                   type: string
 *                 transfer:
 *                   type: boolean
 *               required:
 *                 - transfer
 */