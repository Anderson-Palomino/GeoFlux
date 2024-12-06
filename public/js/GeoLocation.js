const geolocation = new ol.Geolocation({
    projection: null, // La proyección se configurará en VistaInicio.js
  });
  
  const posicionFeature = new ol.Feature();
  posicionFeature.setStyle(
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
          color: "blue",
        }),
        stroke: new ol.style.Stroke({
          color: "white",
          width: 2,
        }),
      }),
    })
  );
  
  const exactitudFeature = new ol.Feature();
  
  const vectorLayerPosicion = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [posicionFeature, exactitudFeature],
    }),
    displayInLayerSwitcher: false,
  });
  
  function configurarEventos(map) {
    geolocation.on("change", function () {
      console.log(geolocation.getPosition());
      zoomFeature(map);
      geolocation.setTracking(false);
    });
  
    geolocation.on("error", function (evt) {
      console.error(evt.message);
    });
  
    geolocation.on("change:position", function () {
      const coordenadas = geolocation.getPosition();
      posicionFeature.setGeometry(new ol.geom.Point(coordenadas));
    });
  
    geolocation.on("change:accuracyGeometry", function () {
      exactitudFeature.setGeometry(geolocation.getAccuracyGeometry());
    });
  
    map.addLayer(vectorLayerPosicion);
  }
  
  function zoomFeature(map) {
    const src = vectorLayerPosicion.getSource();
    const ext = src.getExtent();
    const zm = map.getView().getMaxZoom() - 8;
  
    map.getView().fit(ext, { size: map.getSize(), duration: 750, maxZoom: zm });
  }
  
  export { geolocation, configurarEventos };