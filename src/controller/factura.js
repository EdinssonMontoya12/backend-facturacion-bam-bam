import pool from '@database'
import defactura from './defactura'

const factura = {}

factura.insertar = async (req, res) => {
    try {
        const factura = [
            req.body.codigofact,
            req.body.fecha,
            req.body.codtercero,
            req.body.sucid,
            req.body.observacion,
            req.body.numero,
            req.body.user,
            req.body.tercero,
            req.body.total
        ]

        const consulta = "CALL SUPER_INSERTAR_FACTURA(?,?,?,?,?,?,?,?,?)"
        var result = await pool.query(consulta, factura);

        result = result[0][0][0]

        if(result.OSUCCESS === 1){

            console.log(req.body.detalle)

            const resdefactura = await defactura.insertar(req.body.detalle, req.body.sucid, result.ID)

            console.log(resdefactura)

            if(resdefactura.OSUCCESS === 1) res.json({ OSUCCESS: 1, OMENSAJE: 'Se ha insertado la factura con detalle'})
            else if(resdefactura.OSUCCESS === 2) res.json({ OSUCCESS: 1, OMENSAJE: 'Se ha insertado la factura sin detalle'})
            else res.json({ OSUCCESS: 0, OMENSAJE: 'No se ha podido insertar la factura'})

        }else{
            console.log(result)
            return res.json(result)
        }

    } catch (err) {
        const data = {
            "OSUCCESS": 0,
            "OMENSAJE": "No se ha podido insertar la factura",
            "err": err.message
        }

        console.log(data)

        return res.json(data)
    }
}

factura.consutlar = async (req, res) => {

    try {
        const data = [
            req.params.sucid,
            req.params.texto,
            req.params.tipofac
        ]

        const query = 'CALL SUPER_CONSULTAR_FACTURAS(?,?,?)'

        var result = await pool.query(query, data)

        const response = {
            OSUCCESS: result[0][0].length > 0 ? 1 : 0,
            DATA: result[0][0]
        }

        return res.json(response)

    } catch (e) {
        const data = {
            OSUCCESS: 0,
            OMENSAJE: 'No se ha podido consultar la factura',
            err: e.message
        }
        return res.json(data)
    }
}

factura.consutlarUna = async (req, res) => {
    try {

        const { id } = req.params

        const query = "CALL SUPER_CONSULTAR_FACTURA(?)"

        const result = await pool.query(query, [id])

        const data = {
            "OSUCCESS": result[0][0].length > 0 ? 1 : 0,
            "DATA": result[0][0]
        }

        return res.json(data)

    } catch (err) {
        const data = {
            "OSUCCESS": 0,
            "OMENSAJE": "No se ha podido consultar la factura",
            "err": err.message
        }

        return res.json(data)
    }
}

factura.eliminar = async (req, res) => {

    try {

        const { id } = req.params

        const query = 'CALL SUPER_BORRAR_FACTURA(?)'

        const result = await pool.query(query, [id])

        return res.json(result[0][0][0])

    } catch (err) {
        const data = {
            "OSUCCESS": 0,
            "OMENSAJE": "No se ha podido eliminar la factura",
            "err": err.message
        }

        return res.json(data)
    }
}

factura.actualizar = async (req, res) => {

    try {

        const tercero = [
            req.params.id,
            req.body.terid,
            req.body.nombreter
        ]

        const query = "CALL SUPER_ACTUALIZAR_GRUPOARTICULO(?,?)"

        const result = pool.query(query, tercero);

        return res.json(result[0][0][0])

    } catch (err) {
        const data = {
            "OSUCCESS": 0,
            "OMENSAJE": "No se ha podido actualizar el grupo de articulo",
            "err": err.message
        }

        return res.json(data)
    }
}

factura.asentar = async (req, res) => {

    try{
        const data = [
            req.params.id,
            req.params.fecha
        ]
    
        console.log(data)

        const query = "CALL SUPER_ASENTAR_FACTURA(?,?)"
    
        const response = pool.query(query,data)

        console.log(response[0][0])
    
        if(response[0][0][0].OSUCCESS === 1){
            return res.json(response[0][0][0])
        }else{
            return res.json({
                OSUCCESS: 0,
                OMENSAJE: 'No se ha podido insertar la factura'
            })
        }
    }catch(e){
        const data = {
            OSUCCESS: 0,
            OMENSAJE: 'No se ha podido asentar la factura',
            err: e.message
        }
        return res.json(data)
    }

}

factura.asentarcompra = async (req, res) => {

    try{
        const data = [
            req.params.id,
            req.params.fecha
        ]

        const query = "CALL SUPER_ASENTAR_FACTURA(?,?)"
    
        const response = pool.query(query,data)

        console.log(response[0][0])
    
        if(response[0][0][0].OSUCCESS === 1){
            return res.json(response[0][0][0])
        }else{
            return res.json({
                OSUCCESS: 0,
                OMENSAJE: 'No se ha podido asentar la factura'
            })
        }
    }catch(e){
        const data = {
            OSUCCESS: 0,
            OMENSAJE: 'No se ha podido asentar la factura',
            err: e.message
        }
        return res.json(data)
    }

}

factura.reversar = async (req, res) => {

}

export default factura