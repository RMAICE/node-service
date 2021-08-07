import { Router } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'

import { docsPrefix, swaggerConfig } from '../config/index.js'
import prometheus from './prometheus.js'
import clickContext from './clickContext.js'

const router = Router()
const specDoc = swaggerJsdoc(swaggerConfig)

router.use(docsPrefix, serve)
router.get(docsPrefix, setup(specDoc, { explorer: true }))

router.use('/prometheus', prometheus)
router.use('/click-context', clickContext)

export default router
