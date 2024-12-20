import RotacionNorte from "./RotacionNorte.js";
import { getStlEcosistemas, estilos } from "./Estilos.js";
import PosicionActual from "./PosicionActual.js";
import { geolocation, configurarEventos } from "./GeoLocation.js";
import { baseLayer } from "./CapasBase.js";
import { srcEcosistemas, control_busqueda,i_select } from "./ControlBusqueda.js";

const map = new ol.Map({
  controls: ol.control.defaults
    .defaults({
      zoom: true,
      zoomOptions: { zoomInTipLabel: "Acercar", zoomOutTipLabel: "Alejar" },
    })
    .extend([new RotacionNorte()]),
  // controls: ol.control.defaults.defaults().extend([new RotacionNorte()]),
  target: "map",
  layers: [
    baseLayer,
    new ol.layer.Vector({
      source: new ol.source.Vector({
        url: "data/ANP.geojson",
        format: new ol.format.GeoJSON(),
      }),
      
      title:"Areas Naturales Protegidas",
      style: estilos,
    }),

    // new ol.layer.Vector({
    //   source: srcEcosistemas,
    //   title:"Ecosistemas",
    //   style: getStlEcosistemas,
    // }),

    new ol.layer.Vector({
      source: new ol.source.Vector({
        url: "data/features.json",
        format: new ol.format.GeoJSON(),
      }),
      // style: new ol.style.Style({
      //   stroke: new ol.style.Stroke({
      //     color: "orange",
      //     width: 3,
      //     // lineCap: "square",
      //     // lineJoin: "miter",
      //     //valor, espacio, valor, espacio
      //     lineDash: [15, 10, 1, 10],
      //   }),
      //   fill: new ol.style.Fill({
      //     color: "rgba(255, 165, 0, 0.3)",
      //   }),
      //   // image: new ol.style.Circle({
      //   //   stroke: new ol.style.Stroke({
      //   //     color:"orange",
      //   //     width: 3,
      //   //   }),
      //   //   radius: 8,
      //   //   fill: new ol.style.Fill({
      //   //     color: "rgba(255, 165, 0, 0.3)",
      //   //   }),
      //   // }),
      //   // image: new ol.style.RegularShape({
      //   //   points:4,
      //   //   radius:8,
      //   //   stroke: new ol.style.Stroke({
      //   //     //colores de los puntos
      //   //     color:"#218ddc",
      //   //     width: 3,
      //   //   }),
      //   //   fill: new ol.style.Fill({
      //   //     color: "rgba(255, 165, 0, 0.3)",
      //   //   }),
      //   //   rotation: 45,
      //   // })
      //   image: new ol.style.Icon({
      //     src: "img/icon/arbol.png",
      //     // color: "#5adc21"
      //   }),

      //   text: new ol.style.Text({
      //     text: "Objeto",
      //     offsetY: 20,
      //     scala: 1.5,
      //     stroke: new ol.style.Stroke({
      //       //colores de los puntos
      //       color: "#218ddc",
      //       width: 4,
      //     }),
      //     fill: new ol.style.Fill({
      //       color: "#020500",
      //     }),
      //   }),
      // }),
      style: estilos,
      title: "Features",
      baseLayer: false,
      visible: true,
    }),
  ],
  view: new ol.View({
    center: new ol.proj.fromLonLat([-77.026211, -11.883041]),
    // center: [-8574529.390430272, -1332463.4945135845],
    zoom: 14,
    // minZoom: 12,
    // maxZoom: 17,
  }),
});

const layerSwitcher = new ol.control.LayerSwitcher({
  mouseover: true,
  trash: true,
  show_progress: true,
  oninfo: function (l) {
    console.log(l.get("title"));
  },
});

layerSwitcher.on("drawlist", function (e) {
  console.log(e);

  const layer = e.layer;

  // Crear el botón y agregar funcionalidad de clic
  $('<div>')
    .text("?")
    .on("click", function () {
      console.log(layer.get("title"));
    })
    .appendTo($(".ol-layerswitcher-buttons", e.li));
});

layerSwitcher.setHeader("<b>Capas</b>");

map.addControl(layerSwitcher);

geolocation.setProjection(map.getView().getProjection());
configurarEventos(map);

map.addControl(new PosicionActual(geolocation));
map.addControl(control_busqueda);
map.addInteraction(i_select);

control_busqueda.on("select", function (e) {
  console.log(e);
  i_select.getFeatures().clear();
  i_select.getFeatures().push(e.search);

  const p = e.search.getGeometry().getFirstCoordinate();
  map.getView().animate({zoom:15,center:p});
});

document.getElementById('uploadGeoJSON').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const geojson = e.target.result;
      const vectorSource = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(geojson, {
          featureProjection: map.getView().getProjection()
        })
      });
      const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: estilos
      });
      map.addLayer(vectorLayer);
    };
    reader.readAsText(file);
  }
});

export { map };
