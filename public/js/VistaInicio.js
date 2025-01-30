import RotacionNorte from "./RotacionNorte.js";
import { getStlEcosistemas, estilos } from "./Estilos.js";
import PosicionActual from "./PosicionActual.js";
import { geolocation, configurarEventos } from "./GeoLocation.js";
import { baseLayer } from "./CapasBase.js";
import { srcEcosistemas, control_busqueda, i_select } from "./ControlBusqueda.js";

const map = new ol.Map({
  controls: ol.control.defaults
    .defaults({
      zoom: true,
      zoomOptions: { zoomInTipLabel: "Acercar", zoomOutTipLabel: "Alejar" },
    })
    .extend([new RotacionNorte()]),
  target: "map",
  layers: [
    baseLayer,
    new ol.layer.Vector({
      source: new ol.source.Vector({
        url: "data/ANP.geojson",
        format: new ol.format.GeoJSON(),
      }),
      title: "Areas Naturales Protegidas",
      style: estilos,
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        url: "data/features.json",
        format: new ol.format.GeoJSON(),
      }),
      style: estilos,
      title: "Features",
      baseLayer: false,
      visible: true,
    }),
    new ol.layer.Tile({
      source: new ol.source.TileWMS({
        attributions: "@geoserver",
        url: "http://192.168.1.58:8080/geoserver/wms?",
        params: {
          LAYERS: "Departamentos:departamentos",
          TILED: true,
        },
      }),
      visible: false,
      title: "Departamentos",
    }),
    
    new ol.layer.Tile({
      source: new ol.source.TileWMS({
        attributions: "@geoserver",
        url: "http://192.168.1.58:8080/geoserver/wms?",
        params: {
          LAYERS: "CoberturaVegetal:cobveg_180615",
          TILED: true,
        },
      }),
      visible: false,
      title: "Cobertura Vegetal",
    }),
  ],
  view: new ol.View({
    center: new ol.proj.fromLonLat([-77.026211, -11.883041]),
    zoom: 14,
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
  map.getView().animate({ zoom: 15, center: p });
});

document.getElementById('uploadGeoJSON').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const geojson = e.target.result;

      const attributeName = prompt("Ingrese el nombre del atributo para los títulos de los multipolígonos:");
      const layerName = prompt("Ingrese el nombre de la capa:");

      const vectorSource = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(geojson, {
          featureProjection: map.getView().getProjection()
        })
      });
      const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function (feature) {
          return new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'orange',
              width: 3
            }),
            fill: new ol.style.Fill({
              color: 'rgba(255, 165, 0, 0.3)'
            }),
            text: new ol.style.Text({
              text: feature.get(attributeName),
              offsetY: 20,
              scale: 1.5,
              stroke: new ol.style.Stroke({
                color: '#218ddc',
                width: 4
              }),
              fill: new ol.style.Fill({
                color: '#020500'
              })
            })
          });
        }
      });
      vectorLayer.set('title', layerName);
      map.addLayer(vectorLayer);

      localStorage.setItem('uploadedGeoJSON', geojson);
      localStorage.setItem('attributeName', attributeName);
      localStorage.setItem('layerName', layerName);
    };
    reader.readAsText(file);
  }
});

const savedGeoJSON = localStorage.getItem('uploadedGeoJSON');
const savedAttributeName = localStorage.getItem('attributeName');
const savedLayerName = localStorage.getItem('layerName');
if (savedGeoJSON && savedAttributeName && savedLayerName) {
  const vectorSource = new ol.source.Vector({
    features: new ol.format.GeoJSON().readFeatures(savedGeoJSON, {
      featureProjection: map.getView().getProjection()
    })
  });
  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: function (feature) {
      return new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'orange',
          width: 3
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 165, 0, 0.3)'
        }),
        text: new ol.style.Text({
          text: feature.get(savedAttributeName),
          offsetY: 20,
          scale: 1.5,
          stroke: new ol.style.Stroke({
            color: '#218ddc',
            width: 4
          }),
          fill: new ol.style.Fill({
            color: '#020500'
          })
        })
      });
    }
  });
  vectorLayer.set('title', savedLayerName);
  map.addLayer(vectorLayer);
}

export { map };
