const express = require('express');
const router = express.Router();
const Contenedor = require('../Contenedor');

const productos = new Contenedor('productos');

router.get('/', (req, res) => {
  res.render('pages/index');
});

// Se publica el formulario en la ruta /productos
router.post('/productos', (req, res) => {
  console.log('se hico un post', req.body);
  productos.save(req.body).then(id => {
      res.redirect('/');
  });
});

router.get('/productos', (req,res) => {
  productos.getAll().then(items => {
    res.render('pages/productos', {items});
  });
});

module.exports = router;