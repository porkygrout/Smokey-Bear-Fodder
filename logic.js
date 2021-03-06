// Initialize all of the LayerGroups we'll be using
var layers = {
  Arson: new L.LayerGroup(),
  Campfire: new L.LayerGroup(),
  Children: new L.LayerGroup(),
  Debris_Burning: new L.LayerGroup(),
  Equipment_Use: new L.LayerGroup(),
  Lightning: new L.LayerGroup(),
  Miscellaneous: new L.LayerGroup(),
  Smoking: new L.LayerGroup(),
  Other: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [
    layers.Arson,
    layers.Campfire,
    layers.Debris_Burning,
    layers.Equipment_Use,
    layers.Lightning,
    layers.Miscellaneous,
    layers.Smoking,
    layers.Other
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Arson": layers.Arson,
  "Campfire": layers.Campfire,
  "Children": layers.Children,
  "Debris Burning": layers.Debris_Burning,
  "Equipment Use": layers.Equipment_Use,
  "Lightning": layers.Lightning,
  "Miscellaneous": layers.Miscellaneous,
  "Smoking": layers.Smoking,
  "Other": layers.Other
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  Arson: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  Campfire: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  Children: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  Debris_Burning: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  Equipment_Use: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  Lightning: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "cyan",
    shape: "circle"
  }),
  Miscellaneous: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "pink",
    shape: "circle"
  }),
  Smoking: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "violet",
    shape: "circle"
  }),
  Other: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "yellow",
    shape: "circle"
  }),
};

// Perform an API call to the Citi Bike Station Information endpoint
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", function(infoRes) {

    // Create an object to keep of the number of markers in each layer
    var fireCount = {
      Arson: 0,
      Campfire: 0,
      Children: 0,
      Debris_Burning: 0,
      Equipment_Use: 0,
      Lightning: 0,
      Miscellaneous: 0,
      Smoking: 0,
      Other: 0
    };

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var firetypeCode;

    // Loop through the stations (they're the same size and have partially matching data)
    for (var i = 0; i < infoRes.length; i++) {

      // If a station is listed but not installed, it's coming soon
      if (infoRes.STAT_CAUSE_DESCR = "Arson") {
        firetypeCode = "Arson";
      }
      // If a station has no bikes available, it's empty
      else if (infoRes.STAT_CAUSE_DESCR = "Campfire") {
        firetypeCode = "Campfire";
      }
      // If a station is installed but isn't renting, it's out of order
      else if (infoRes.STAT_CAUSE_DESCR = "Children") {
        firetypeCode = "Children";
      }
      // If a station has less than 5 bikes, it's status is low
      else if (infoRes.STAT_CAUSE_DESCR = "Debris Burning") {
        firetypeCode = "Debris_Burning";
      }
      // Otherwise the station is normal
      else if (infoRes.STAT_CAUSE_DESCR = "Equipment Use") {
        firetypeCode = "Equipment_Use";
      }
      else if (infoRes.STAT_CAUSE_DESCR = "Lightning") {
        firetypeCode = "Lightning";
      }
      else if (infoRes.STAT_CAUSE_DESCR = "Miscellaneous") {
        firetypeCode = "Miscellaneous";
      }
      else if (infoRes.STAT_CAUSE_DESCR = "Smoking") {
        firetypeCode = "Smoking";
      }
      else {
        firetypeCode = "Other"
      }

      // Update the station count
      fireCount[firetypeCode]++;
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([infoRes.latitude, infoRes.longitude], {
        icon: icons[firetypeCode]
      });

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[firetypeCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup("Fire Name " + infoRes.FIRE_NAME + "<br> Type: " + infoRes.STAT_CAUSE_DESCR + "<br> Reporting Agency: " + infoRes.NWCG_REPORTING_UNIT_NAME);
    }

    // Call the updateLegend function, which will... update the legend!
    updateLegend(fireCount);
  });
});

// Update the legend's innerHTML with the last updated time and station count
function updateLegend(fireCount) {
  document.querySelector(".legend").innerHTML = [
    "<p class='Arson'>Arson: " + fireCount.Arson + "</p>",
    "<p class='Campfire'>Campfire: " + fireCount.Campfire + "</p>",
    "<p class='Children'>Children: " + fireCount.Children + "</p>",
    "<p class='Debris_Burning'>Debris Burning: " + fireCount.Debris_Burning + "</p>",
    "<p class='Equipment_Use'>Equipment Use: " + fireCount.Equipment_Use + "</p>",
    "<p class='Lightning'>Lightning: " + fireCount.Lightning + "</p>",
    "<p class='Miscellaneous'>Miscellaneous" + fireCount.Miscellaneous + "</p>",
    "<p class='Smoking'>Smoking" + fireCount.Smoking + "</p>",
    "<p class='Other'>Other" + fireCount.Other + "</p>"
  ].join("");
}
