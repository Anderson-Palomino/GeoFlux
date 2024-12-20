// Estilos.js
function estilos(feature) {
  console.log(feature);

  const formato = new ol.format.GeoJSON();
  const json = JSON.parse(formato.writeFeature(feature));
  console.log(json.geometry.type);

  //Codigo para obtener el nombre de la loma
  const nomef = feature.get("NOMEF")||"Desconocido";
  const anpnomb=feature.get("anp_nomb")||"Desconocido";

  // Estilo para puntos
  const stlPunto = new ol.style.Style({
    image: new ol.style.Icon({
      src: "img/icon/arbol.png",
    }),
    text: new ol.style.Text({
      text: "Punto",
      offsetY: 20,
    }),
  });

  // Estilo para líneas
  const stlLinea = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "#fa4929",
      width: 5,
    }),
    text: new ol.style.Text({
      text: "Linea",
    }),
  });

  // Estilo para polígonos
  const stlPoligono = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "#3ac146",
      width: 5,
    }),
    fill: new ol.style.Fill({
      color: "#c6f8ca",
    }),
    text: new ol.style.Text({
      text: "Poligono",
    }),
  });

  

  const stlMultiPoligono = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "#ff0000",
      width: 3,
    }),
    fill: new ol.style.Fill({
      color: "rgba(255, 0, 0, 0.1)",
    }),
    text: new ol.style.Text({
      text: anpnomb,
      font:"bold 12px Arial",
      offsetY: 20,
      scale: 1.5,
      stroke: new ol.style.Stroke({
        color: "white",
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: "black",
      }),
    }),
  });

  var stl = new ol.style.Style({});

  switch (json.geometry.type) {
    case "LineString":
      stl = stlLinea;
      break;
    case "Polygon":
      stl = stlPoligono;
      break;
    case "MultiPolygon":
      stl = stlMultiPoligono;
      break;
    case "Point":
      stl = stlPunto;
      break;
  }
  return stl;
}

function getStlEcosistemas(feature){
  console.log(feature, feature.get("NOMEF"));
  const stlEcosistemas = new ol.style.Style({
    fill: new ol.style.Fill({
      color: "rgba(0, 0, 255, 0.1)",
      width:2,
    }),
    stroke: new ol.style.Stroke({
      color: "blue",
      width: 2,
    }),
    text: new ol.style.Text({
      text: feature.get("NOMEF"),
      offsetY: 20,
      scale: 1.5,
      stroke: new ol.style.Stroke({
        color: "blue",
        width: 4,
      }),
      fill: new ol.style.Fill({
        color: "white",
      }),
    }),
  })
  return stlEcosistemas;
}

export function promptForAttribute() {
  // Function implementation
}

// Exporta la función
export { getStlEcosistemas, estilos };
