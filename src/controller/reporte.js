import pool from '@database'

const reporte = {}

reporte.kardexXarticulo = async (req, res) => {

    try {

        let params = [
            req.params.sucid
        ]
        console.log(params)
        const consulta = "CALL SUPER_REPORT_KARDEXXART(?)"

        const result = await pool.query(consulta, params);

        console.log(result[0][0])

        const data = {
            "OSUCCESS": 1,
            "DATA": result[0][0]
        }        
        //console.log(data)
        return res.json(data);

    } catch (err) {
        const data = {
            "OSUCCESS": 0,
            "OMENSAJE": "No se ha podido generar el reporte",
            "err": err.message
        }

        return res.json(data)
    }
}

export default reporte