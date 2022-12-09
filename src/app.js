//importando los modulos necesarios
import express from "express";
import cors from "cors";
import "module-alias/register";
import router from "@routes"

const app = express();
//Se establece el puerto
app.set('port', process.env.PORT || 3001);

//configuracion basica de express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: '*'
}));
//invocacion a las rutas
app.use(router);

//imprimir cada que se conecten al servidor
app.listen(app.get('port'), () => {
    console.log("El servidor se inicio en el puerto: ", app.get('port'));
})