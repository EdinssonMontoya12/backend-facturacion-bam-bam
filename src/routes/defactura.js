import express from 'express';
import defactura from '@controllers/defactura'

const router = new express.Router()

router.get('/:id', defactura.consultar)

export default router