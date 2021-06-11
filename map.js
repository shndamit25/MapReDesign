require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Basemap",
  "esri/layers/VectorTileLayer",
  "esri/layers/CSVLayer"
], function (esriConfig,Map, MapView,Basemap, VectorTileLayer, CSVLayer) {
  esriConfig.apiKey = "AAPKb919287c9b034eab86067b6ccb2731dc46Mq8yqPflHvQErye8Vcgc6SVQpZ2QFPp_NOBvdihwlC_-h100B-EXrij5pJ-KIu";

  const basemap = new Basemap({
      baseLayers: [
        new VectorTileLayer({
          portalItem: {
            id: "ba00d602b11b4ff380153948523fb984"
          }
        })
      ]
    });

  const popupTemplate = {
    content: "{place}"
  };

  let iconRenderer = {
    type: "simple",
    symbol: {
      type: "simple-marker",

      color: [
        255,255,255
      ],
      size: 30,
      xoffset: 0,
      yoffset: 15,
      path: "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z"

    }
  }

  let locationLabels = {
    symbol: {
      type: "text",
      color: "#FFFFFF",
      haloColor: "#000000",
      haloSize: "1px",
      font: {
        size: "15px",
        family: "Arial",
        style: "normal",
        weight: "bold"
      }
    },
    labelPlacement: "center-center",
    labelExpressionInfo: {
      expression: "$feature.place"
    }
  };




  document.getElementById("USAbutton").addEventListener("click", function () {
    SetMap({
      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
      csvUrl: "./assets/USA.csv",
      center: [-95.7129, 37.0902], // longitude, latitude
      zoom: 3
    });
  });

  document.getElementById("WorldButton").addEventListener("click", function () {
    SetMap({
      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
      csvUrl: "./assets/World.csv",
      center: [44.525455, 1.677438], // longitude, latitude
      zoom: 1
    });
  });

  function SetMap(mapConfiguration) {
    let map = new Map({
      basemap: basemap
    });

    let view = new MapView({
      container: "view",
      map: map,
      center: mapConfiguration.center,
      zoom: mapConfiguration.zoom
    });

    let csvLayer = new CSVLayer({
      url: mapConfiguration.csvUrl,
      labelingInfo: [locationLabels],
      renderer: iconRenderer,
      popupTemplate: popupTemplate
    });

    map.add(csvLayer);

  }

});