const baseLayer= new ol.layer.Group({
    title: "Capas Base",
    layers:[
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: "http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        }),
        title: "Google Satellite",
        baseLayer: true,
        visible: false,
      }),
  
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: "http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        }),
        title: "Google Hybrid",
        baseLayer: true,
      }),
  
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: "http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
        }),
        title: "Google Terrain",
        baseLayer: true,
        visible: false,
      }),
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        title: "Open Street Map",
        baseLayer: true,
        visible: false,
      }),
    ]
  });

  export {baseLayer};