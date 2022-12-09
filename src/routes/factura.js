import express from 'express';
import factura from '@controllers/factura'

const router = new express.Router()

router.get('/:id', factura.consutlarUna)
router.get('/:sucid/:texto/:tipofac', factura.consutlar)
router.post('/', factura.insertar)
router.delete('/:id', factura.eliminar)
router.put('/:id', factura.actualizar)
router.put('/asentar/:id/:fecha', factura.asentar)
router.put('/asentar/compra/:id/:fecha', factura.asentarcompra)
router.get('/reversar/:id', factura.reversar)
router.get('/sepuedereversar/:id', factura.sePuedeReversar)

export default router