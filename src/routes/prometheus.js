import { Router } from 'express'
import Prometheus from '../controllers/prometheus.js'


const prometheus = new Prometheus()
const router = Router()

router.get('/metrics', prometheus.metrics)
router.get('/health-check', prometheus.healthCheck)

export default router
