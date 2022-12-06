import pool from '@database'

const defactura = {}

defactura.insertar = async (detalle, sucid, facturaid) => {
    try {
        if (detalle.length > 0) {

            detalle.forEach(x => {
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

                pool.query(query, detallesend)
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

export default defactura