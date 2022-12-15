import express from 'express';
import consecutivo from '@controllers/consecutivo'

const router = new express.Router()

router.get('/:sucid/:codfact', consecutivo.consultar)
router.get('/:sucid', consecutivo.insertar)

export default router