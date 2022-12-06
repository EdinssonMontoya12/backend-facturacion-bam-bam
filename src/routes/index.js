import express from 'express';
import factura from './factura'
import defactura from './defactura'
import consecutivo from './consecutivo'
import reporte from './reporte'

const router = new express.Router()

router.use('/factura', factura)
router.use('/defactura', defactura)
router.use('/consecutivo', consecutivo)
router.use('/reporte', reporte)

export default router
