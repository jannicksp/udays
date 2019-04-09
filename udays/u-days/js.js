$(function () {

    // Set up pie chart and add data.
    var config = {
        type: 'pie',
        options: {
            legend: {
                display: false
            },
            cutoutPercentage: 0.1,
            animation: {
                animateScale: true
            }
        },
        data: {
            labels: ["Brugergrænsefladeudvikling  25%", "Brugeroplevelse  25% ", "Indholdsproduktion  17 %", "Forretning  8%", "Teknologi  8%"],
            machineLabels: ["Brugergræsefladeudvikling", "Brugeroplevelse", "Indholdsproduktion", "Forretning", "Teknologi"],
            datasets: [{
                borderWidth: 0,
                backgroundColor: [
          '#76b82a',
          '#ea5b1b',
          '#ffcc33',
          '#cc3333',
          '#000000',
        ],
                data: [50, 50, 17, 8, 8]
      }]
        }
    };

    // Instantiate the pie chart in the canvas element.
    var myPie = new Chart(document.getElementById('progress-chart'), config);

    // Register click event to log the clicked label (machine name).
    document.getElementById('progress-chart').onclick = function (evt) {
        var activePoints = myPie.getElementAtEvent(evt);
        var firstPoint = activePoints[0];
        if (firstPoint !== undefined) {
            var clickedItem = config.data.machineLabels[firstPoint._index];
            console.log(clickedItem);
        }
    };

    // Add the legend in custom area to allow CSS theming.
    document.getElementById('chart-legend').innerHTML = myPie.generateLegend();



});
//SPØRGER EFTER OM ELEMENTET "COLLAPSIBLE" HAR DISPLAY NONE ELLER DISPLAY BLOCK OG DEREFTER GØR DET MODSATTE I ET LOOP...........................
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function hentData(url, callback_Funktion) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback_Funktion(this);
        }
    };
}

function visData(jsonData) {
    var jsonElementer = JSON.parse(jsonData.responseText);
    var divIndhold = "";

    for (var i = 0; i < jsonElementer.features.length; i++) {
        var lon = jsonElementer.features[i].geometry.coordinates[0];
        var lat = jsonElementer.features[i].geometry.coordinates[1];

        
        
        divIndhold += '<p>' +
            jsonElementer.features[i].properties.Navn + ' ' +'<a href="https://www.openstreetmap.org/?mlat='+lat+'&mlon='+lon+'#map=14/'+lat+'/'+lon+'"> se placering </a>' + '</p>'; 

    }
    document.getElementById("indhold").innerHTML = divIndhold;
}

//Hovedprogramdel
hentData("http://localhost/u-days/send_json.php", visData);