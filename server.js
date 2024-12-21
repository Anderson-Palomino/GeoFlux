const express = require('express');
const path = require('path');
const mainRouter = require('./routes/main');

const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar el enrutador principal
app.use('/', mainRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});