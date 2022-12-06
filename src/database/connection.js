import config from "./database";
import mysql from "mysql2/promise";

const pool = mysql.createPool(config);

pool.getConnection()
    .then((conn) => console.log("Conectado con el usuario ", conn.config.user, " a la base de datos", conn.config.database))
    .catch((err) => console.error(err));

export default pool; 