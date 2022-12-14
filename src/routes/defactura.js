import express from 'express';
import defactura from '@controllers/defactura'

const router = new express.Router()

router.get('/:id', defactura.consultar)
router.get('/eliminarproducto/:id', defactura.sePuedeEliminarProducto)

export default router