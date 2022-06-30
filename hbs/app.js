const express =require('express');
const app = express();
const productApi = require('./routes/productos');
const webRouter = require('./routes/index');
const hbs = require('express-handlebars');

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

const server = app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${server.address().port}`);
});

server.on('error', err => console.log('Error en el servidor', err));