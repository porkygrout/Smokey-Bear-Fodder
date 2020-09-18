var button = d3.select(".on");
button.on("click", function() {
    d3.select(".not_hidden").attr("class","hidden leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom");
    d3.select("#map-id").attr("class","not_hidden leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom");
});

var button2 = d3.select(".off");
button2.on("click", function() {
  d3.select(".not_hidden").attr("class","hidden leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom");
  d3.select("#map-ny").attr("class","not_hidden leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom");
});