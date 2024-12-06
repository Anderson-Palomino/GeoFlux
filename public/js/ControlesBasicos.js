import { map } from './VistaInicio.js';

map.addControl(
    new ol.control.FullScreen({
      className: "proy-ol-full-screen",
      tipLabel: "Pantalla Completa",
    })
  );
  
  // Añadir el control de MousePosition y especificar el target
map.addControl(
  new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4), // Formato de las coordenadas (4 decimales)
    projection: 'EPSG:4326', // Proyección para mostrar Lat/Lon
    target: document.getElementById('mouseposition'), // Div donde se mostrarán las coordenadas
    className: 'custom-mouse-position', // Clase CSS personalizada (opcional)
    undefinedHTML: 'Posición del mouse: N/A', // Texto cuando no haya coordenadas
  })
);

  
  map.addControl(new ol.control.ScaleLine());
  
  map.addControl(
    new ol.control.ZoomToExtent({
      extent: [-8579669.444229325, -1337792.2620189576, -8576503.085002037,-1333335.0159590626],
      className: "proy-ol-zoom-extent", // Clase personalizada para estilos
      tipLabel: "Volver al inicio", // Etiqueta de herramienta
    })
  );