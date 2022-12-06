import express from 'express';
import consecutivo from '@controllers/consecutivo'

const router = new express.Router()

router.get('/:sucid/:codfact', consecutivo.consultar)

export default router