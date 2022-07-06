const express =require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Rutas
const productApi = require('./routes/productos');
const webRouter = require('./routes/index');

// Motor de Plantillas
const hbs = require('express-handlebars');

// Contenedor
const Contenedor = require('./Contenedor');
const productos = new Contenedor('productos');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Acesso al REST API
app.use('/api/productos', productApi);

// Directorio publico
app.use(express.static('public'));

// Configura el motor de plantillas
app.engine('hbs',
    hbs.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials'
    })
);

app.use('/', webRouter);

// Establece el directorio y el motor
app.set('view engine', 'hbs');
app.set('views', './views');

// Conexiones websocket
io.on('connection', socket => {
    console.log('Usuario Conectado');

    socket.emit('msg', msg);
})

httpServer.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});