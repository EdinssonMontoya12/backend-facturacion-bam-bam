import pool from '@database'

const consecutivo = {}

consecutivo.insertar = async (req, res) => {
    
}

consecutivo.consultar = async (req, res) => {

    try {

        let consecutivo = [
            req.params.sucid,
            req.params.codfact
        ]

        const consulta = "CALL SUPER_CONSULTAR_CONSECUTIVO(?,?)"

        const result = await pool.query(consulta, consecutivo);

        const data = {
            "OSUCCESS": 1,
            "DATA": result[0][0][0]
        }        

        return res.json(data);

    } catch (err) {
        const data = {
            "OSUCCESS": 0,
            "OMENSAJE": "No se ha podido consultar el consecutivo",
            "err": err.message
        }

        return res.json(data)
    }
}

export default consecutivo