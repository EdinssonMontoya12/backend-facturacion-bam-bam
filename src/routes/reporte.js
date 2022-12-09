import express from 'express'
import reporte from '@controllers/reporte'

const router = express.Router()

router.get('/kardexxarticulo/:sucid', reporte.kardexXarticulo)

export default router