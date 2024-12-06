import { map } from './VistaInicio.js';

const vectorSource = new ol.source.Vector();
const vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  displayInLayerSwitcher: false,
});
map.addLayer(vectorLayer);

const i_dibujo = new ol.interaction.Draw({
  type: "Point",
  source: vectorSource,
});
map.addInteraction(i_dibujo);
i_dibujo.setActive(false);

const i_linea = new ol.interaction.Draw({
  type: "LineString",
  source: vectorSource,
});
map.addInteraction(i_linea);
i_linea.setActive(false);

const i_poligono = new ol.interaction.Draw({
  type: "Polygon",
  source: vectorSource,
});
map.addInteraction(i_poligono);
i_poligono.setActive(false);

const b_limpiar = document.getElementById("limpiar");
b_limpiar.addEventListener("click", function () {
  vectorSource.clear();
});

const b_descargar = document.getElementById("descargar");

const formato = new ol.format.GeoJSON({
  featureProjection: "EPSG:3857",
});

vectorSource.on("change", function () {
  const features = vectorSource.getFeatures();
  const json = formato.writeFeatures(features);
  b_descargar.href =
    "data:application/json;charset=utf-8," + encodeURIComponent(json);
});

const b_punto = document.getElementById("punto");
b_punto.addEventListener("click", function () {
  if (i_dibujo.getActive() == true) {
    i_dibujo.setActive(false);
  } else {
    i_poligono.setActive(false);
    i_linea.setActive(false);
    i_select.setActive(false);
    i_dibujo.setActive(true);
  }
});

const b_linea = document.getElementById("linea");
b_linea.addEventListener("click", function () {
  if (i_linea.getActive() == true) {
    i_linea.setActive(false);
  } else {
    i_dibujo.setActive(false);
    i_poligono.setActive(false);
    i_select.setActive(false);
    i_linea.setActive(true);
  }
});

const b_poligono = document.getElementById("poligono");
b_poligono.addEventListener("click", function () {
  if (i_poligono.getActive() == true) {
    i_poligono.setActive(false);
  } else {
    i_dibujo.setActive(false);
    i_linea.setActive(false);
    i_select.setActive(false);
    i_poligono.setActive(true);
  }
});

const i_modify = new ol.interaction.Modify({ source: vectorSource });
map.addInteraction(i_modify);
i_modify.setActive(false);

const b_modificar = document.getElementById("modificar");
b_modificar.addEventListener("click", function () {
  if (i_modify.getActive() == true) {
    i_modify.setActive(false);
  } else {
    i_dibujo.setActive(false);
    i_linea.setActive(false);
    i_poligono.setActive(false);
    i_select.setActive(false);
    i_modify.setActive(true);
  }
});

const i_select = new ol.interaction.Select({ source: vectorSource });
map.addInteraction(i_select);
i_select.setActive(false);

const b_eliminar = document.getElementById("eliminar");
b_eliminar.addEventListener("click", function () {
  console.log("seleccionado");
  if (i_select.getActive() == true) {
    i_select.setActive(false);
  }
  else {
    i_dibujo.setActive(false);
    i_linea.setActive(false);
    i_poligono.setActive(false);
    i_modify.setActive(false);
    i_select.setActive(true);
  }
});

i_select.on("select", function (e) {
  // console.log(e);
  vectorSource.removeFeature(e.selected[0]);
});
