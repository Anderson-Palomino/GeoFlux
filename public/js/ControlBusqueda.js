const srcEcosistemas = new ol.source.Vector({
  url: "data/ecosistemas.geojson",
  format: new ol.format.GeoJSON(),
});

const control_busqueda = new ol.control.SearchFeature({
  source: srcEcosistemas,
  property: "NOMEF",
  maxItems: 5,
  sort: function (f1, f2) {
    if (
      control_busqueda.getSearchString(f1) <
      control_busqueda.getSearchString(f2)
    ) {
      return -1;
    }
    if (
      control_busqueda.getSearchString(f1) >
      control_busqueda.getSearchString(f2)
    ) {
      return 1;
    }
    return 0;
  },
  placeholder: "Buscar",
});

function getStlSelect(feature) {
  console.log(feature.get("NOMEF"));
  const desc = feature.get("NOMEF");
  const stlSelect = new ol.style.Style({
    fill: new ol.style.Fill({
      color: "rgba(255, 255, 255, 0.5)",
    }),
    stroke: new ol.style.Stroke({
      color: "#ffcc33",
      width: 2,
      lineDash: [4, 8],
    }),
    text: new ol.style.Text({
      text: desc,
      scale: 1.5,
      fill: new ol.style.Fill({
        color: "#ffcc33",
      }),
      stroke: new ol.style.Stroke({
        color: "#333",
        width: 2,
      }),
    })
  });
  return stlSelect;
}

const i_select = new ol.interaction.Select({ style: getStlSelect });

export { control_busqueda, srcEcosistemas, i_select };
