// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});


// Initialize all of the LayerGroups we'll be using
var layers_ma = {
    Arson: new L.LayerGroup(),
    Campfire: new L.LayerGroup(),
    Children: new L.LayerGroup(),
    Debris_Burning: new L.LayerGroup(),
    Equipment_Use: new L.LayerGroup(),
    Fireworks: new L.LayerGroup(),
    Lightning: new L.LayerGroup(),
    Miscellaneous: new L.LayerGroup(),
    Missing_Undefined: new L.LayerGroup(),
    Powerline: new L.LayerGroup(),
    Railroad: new L.LayerGroup(),
    Smoking: new L.LayerGroup(),
    Structure: new L.LayerGroup(),
    Other: new L.LayerGroup()
  };
  
  // Create the map with our layers_ma
  var map_ma = L.map("map-ma", {
    center: [43, -76.0059],
    zoom: 7,
    layers: [
      layers_ma.Arson,
      layers_ma.Campfire,
      layers_ma.Children,
      layers_ma.Debris_Burning,
      layers_ma.Equipment_Use,
      layers_ma.Fireworks,
      layers_ma.Lightning,
      layers_ma.Miscellaneous,
      layers_ma.Missing_Undefined,
      layers_ma.Powerline,
      layers_ma.Railroad,
      layers_ma.Smoking,
      layers_ma.Structure,
      layers_ma.Other
    ]
  });
  
  // Add our 'lightmap' tile layer to the map
  lightmap.addTo(map_ma);
  
  // Create an overlays object to add to the layer control
  var overlays_ma = {
    "Arson": layers_ma.Arson,
    "Campfire": layers_ma.Campfire,
    "Children": layers_ma.Children,
    "Debris Burning": layers_ma.Debris_Burning,
    "Equipment Use": layers_ma.Equipment_Use,
    "Fireworks": layers_ma.Fireworks,
    "Lightning": layers_ma.Lightning,
    "Miscellaneous": layers_ma.Miscellaneous,
    "Missing/Undefined": layers_ma.Missing_Undefined,
    "Powerline": layers_ma.Powerline,
    "Railroad": layers_ma.Railroad,
    "Smoking": layers_ma.Smoking,
    "Structure": layers_ma.Structure,
    "Other": layers_ma.Other
  };

  // Create a control for our layers_ma, add our overlay layers_ma to it
  L.control.layers(null, overlays_ma).addTo(map_ma);
  
  // Create a legend to display information about our map
  var info = L.control({
    position: "bottomright"
  });
  
  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend_ma");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map_ma);
  
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
    Fireworks: L.ExtraMarkers.icon({
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
    Missing_Undefined: L.ExtraMarkers.icon({
      icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
    }),
    Powerline: L.ExtraMarkers.icon({
      icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
    }),
    Railroad: L.ExtraMarkers.icon({
      icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
    }),
    Smoking: L.ExtraMarkers.icon({
      icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "violet",
      shape: "circle"
    }),
    Structure: L.ExtraMarkers.icon({
      icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "green",
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
  d3.json("http://127.0.0.1:5000/api/fire_log_ma", function(fireLog) {
  
      // Create an object to keep of the number of markers in each layer
      var fireCount = {
        Arson: 0,
        Campfire: 0,
        Children: 0,
        Debris_Burning: 0,
        Fireworks: 0,
        Equipment_Use: 0,
        Lightning: 0,
        Miscellaneous: 0,
        Missing_Undefined:0,
        Powerline:0,
        Railroad: 0,
        Smoking: 0,
        Structure: 0,
        Other: 0
      };
  
      // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers_ma, icons, and station count for layer group
      var firetypeCode;
  
      // Loop through the stations (they're the same size and have partially matching data)
      for (var i = 0; i < fireLog.length; i++) {
        var fire = fireLog[i]
        
        console.log(fire.stat_cause_descr)
        // If a station is listed but not installed, it's coming soon
        if (fire.stat_cause_descr == "Arson") {
          firetypeCode = "Arson";
        }
        // If a station has no bikes available, it's empty
        else if (fire.stat_cause_descr == "Campfire") {
          firetypeCode = "Campfire";
        }
        // If a station is installed but isn't renting, it's out of order
        else if (fire.stat_cause_descr == "Children") {
          firetypeCode = "Children";
        }
        // If a station has less than 5 bikes, it's status is low
        else if (fire.stat_cause_descr == "Debris Burning") {
          firetypeCode = "Debris_Burning";
        }
        // Otherwise the station is normal
        else if (fire.stat_cause_descr == "Equipment Use") {
          firetypeCode = "Equipment_Use";
        }
        else if (fire.stat_cause_descr == "Fireworks") {
          firetypeCode = "Fireworks";
        }
        else if (fire.stat_cause_descr == "Lightning") {
          firetypeCode = "Lightning";
        }
        else if (fire.stat_cause_descr == "Miscellaneous") {
          firetypeCode = "Miscellaneous";
        }
        else if (fire.stat_cause_descr == "Missing/Undefined") {
          firetypeCode = "Missing_Undefined";
        }
        else if (fire.stat_cause_descr == "Powerline") {
          firetypeCode = "Powerline";
        }
        else if (fire.stat_cause_descr == "Railroad") {
          firetypeCode = "Railroad";
        }
        else if (fire.stat_cause_descr == "Smoking") {
          firetypeCode = "Smoking";
        }
        else if (fire.stat_cause_descr == "Structure") {
          firetypeCode = "Structure";
        }
        else {
          firetypeCode = "Other"
        }
  
        // Update the station count
        fireCount[firetypeCode]++;
        // Create a new marker with the appropriate icon and coordinates
        var newMarker = L.marker([fire.latitude, fire.longitude], {
          icon: icons[firetypeCode]
        });
  
        // Add the new marker to the appropriate layer
        newMarker.addTo(layers_ma[firetypeCode]);
  
        // Bind a popup to the marker that will  display on click. This will be rendered as HTML
        newMarker.bindPopup("Fire Name " + fire.fire_name + "<br> Type: " + fire.stat_cause_descr + "<br> Reporting Agency: " + fire.nwcg_reporting_unit_name);
      }
  
      // Call the updateLegend function, which will... update the legend!
      updateLegend(fireCount);
    });

  
  // Update the legend's innerHTML with the last updated time and station count
  function updateLegend(fireCount) {
    document.querySelector(".legend_ma").innerHTML = [
      "<p class='Arson'>Arson: " + fireCount.Arson + "</p>",
      "<p class='Campfire'>Campfire: " + fireCount.Campfire + "</p>",
      "<p class='Children'>Children: " + fireCount.Children + "</p>",
      "<p class='Debris_Burning'>Debris Burning: " + fireCount.Debris_Burning + "</p>",
      "<p class='Equipment_Use'>Equipment Use: " + fireCount.Equipment_Use + "</p>",
      "<p class='Fireworks'>Fireworks: " + fireCount.Fireworks + "</p>",
      "<p class='Lightning'>Lightning: " + fireCount.Lightning + "</p>",
      "<p class='Miscellaneous'>Miscellaneous: " + fireCount.Miscellaneous + "</p>",
      "<p class='Missing_Undefined'>Missing/Undefined: " + fireCount.Missing_Undefined + "</p>",
      "<p class='Powerline'>Powerline: " + fireCount.Powerline + "</p>",
      "<p class='Railroad'>Railroad: " + fireCount.Railroad + "</p>",
      "<p class='Smoking'>Smoking: " + fireCount.Smoking + "</p>",
      "<p class='Structure'>Structure: " + fireCount.Structure + "</p>",
      "<p class='Other'>Other: " + fireCount.Other + "</p>"
    ].join("");
  }