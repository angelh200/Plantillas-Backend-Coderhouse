const express =require('express');
const app = express();
const productApi = require('./routes/productos');
const webRouter = require('./routes/index');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Acesso al REST API
app.use('/api/productos', productApi);

// Directorio publico
app.use(express.static('public'));

// Servidor Web
app.use('/', webRouter);

// Establece el directorio y el motor
app.set('views', './views');
app.set('view engine', 'pug');

const server = app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${server.address().port}`);
});

server.on('error', err => console.log('Error en el servidor', err));