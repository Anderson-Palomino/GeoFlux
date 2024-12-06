const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Ruta para el archivo HTML principal
router.get('/', mainController.getIndex);

// Agregar más rutas aquí si es necesario
// router.get('/otraRuta', mainController.otraFuncion);

module.exports = router;