
function startFire(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
        var fireList = d3.select("ul").append("li");
        fireList.text(response[i]["fire_name"]);
    }
}

d3.json("http://127.0.0.1:5000/api/fire_log", startFire);

