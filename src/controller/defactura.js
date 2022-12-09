import pool from '@database'
import { query } from 'express';

const defactura = {}

defactura.insertar = async (detalle, sucid, facturaid) => {
    try {
        if (detalle.length > 0) {

            detalle.forEach( async (x) => {
                const detallesend = [
                    facturaid,
                    x.producto.articuloid,
                    x.producto.nombre,
                    x.producto.codigo,
                    x.detalle.cantidad,
                    x.detalle.valor,
                    x.lote.loteid,
                    x.lote.codigo,
                    sucid
                ]

                console.log(detallesend)
                const query = 'CALL SUPER_INSERTAR_DEFACTURA(?,?,?,?,?,?,?,?,?)'

                await pool.query(query, detallesend)
            });

            return {
                OSUCCESS: 1,
                OMENSAJE: 'Se ha insertado los detalles de factura'
            };

        } else {
            return {
                OSUCCESS: 2,
                OMENSAJE: 'No contiene detalle'
            };
        }

    } catch (err) {
        const data = {
            "OSUCCESS": 0,
            "OMENSAJE": "No se ha podido insertar el detalle de la factura",
            "err": err.message
        }

        return data
    }
}

defactura.consultar = async (req, res) => {

    try {
        const data = [
            req.params.id
        ]

        const query = 'CALL SUPER_CONSULTAR_DEFACTURA(?)'

        var result = await pool.query(query, data)

        const response = {
            OSUCCESS: result[0][0].length > 0 ? 1 : 0,
            DATA: result[0][0]
        }

        return res.json(response)

    } catch (e) {
        const data = {
            OSUCCESS: 0,
            OMENSAJE: 'No se ha podido consultar la defactura',
            err: e.message
        }
    }
}

defactura.eliminar = async (detalle) =>{

    const query = 'CALL SUPER_BORRAR_DETALLE(?)'
    var contador = 0
    var result = 1
    if(detalle.length > 0){
        while(contador < detalle.length && result === 1){
            const resultDele = await pool.query(query, detalle[contador])
            result = resultDele[0][0][0].OSUCCESS
            contador++
        }
        return { OSUCCESS: result}
    }else{
        return {OSUCCESS: 1}
    }
}

defactura.actualizar = async (deEliminar, deInsertar, facturaid, sucid) => {

    const resultInsert = await defactura.insertar(deInsertar, sucid, facturaid)
    const resultDel = await defactura.eliminar(deEliminar)
    console.log(deInsertar, facturaid, sucid)
    console.log(resultInsert, resultDel)
    if(resultInsert.OSUCCESS === 1 && resultDel.OSUCCESS === 1)
        return { OSUCCESS: 1}
    else return { OSUCCESS: 0}

}

export default defactura