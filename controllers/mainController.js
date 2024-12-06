const path = require('path');

exports.getIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
};

// Agregar más funciones aquí si es necesario
// exports.otraFuncion = (req, res) => {
//   res.send('Otra respuesta');
// };