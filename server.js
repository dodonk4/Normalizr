const port = 8080;
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const Contenedor = require('./public/productos');
const Mensajeria = require('./public/mensajes');
const tablero = require('./public/tablaFaker');


const caja = new Contenedor();
const mensajeria = new Mensajeria('./public/mensajes.txt');
const mensajeriaANormalizar = new Mensajeria('./public/mensajesANormalizar.txt');

const app = express();

app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine({defaultLayout: "index"}));
app.set('view engine', 'handlebars');
app.set("views", "./views");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('public'));

httpServer.listen(port, () => console.log(`App listening to port ${port}`));






app.get('/', async (req, res) => {

    
    await caja.crearTabla();
    // await mensajeria.crearTabla();
    // await caja.insertarProductos(); //USAR PARA LLENAR LA TABLA VACÍA UNA VEZ Y LUEGO COMENTARLO
    // await mensajeria.insertarMensajes(); //USAR PARA LLENAR LA TABLA VACÍA UNA VEZ Y LUEGO COMENTARLO
    let productos = await caja.obtenerTodos();
    let mensajes = await mensajeria.obtenerTodos();
    res.render('inicio', await { titulo: 'PRODUCTO', titulo2: 'PRECIO', titulo3: 'THUMBNAIL', productos, mensajes});
    
    
});

app.get('/api/productos-test', async (req, res) => {
    // await tablero();
    res.send(await mensajeriaANormalizar.obtenerTodos());
}

)


io.on('connection', async (socket)=>{
    
    console.log('Usuario conectado: ' + socket.id);


    socket.on('prod', async (data)=>{
        await caja.insertarProductosIndividuales(data);
        io.sockets.emit('prod', data)
    })

    socket.on('mensaje', async(data)=>{
        console.log('socket funcionando')
        await mensajeria.insertarMensajesIndividuales(data);
        io.sockets.emit('mensaje', data);

    })

})

