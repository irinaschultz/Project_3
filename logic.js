// Get the url
const url = "static/data/volcano_data.geojson";

// Fetch the geoJSON data and console log it
d3.json(url).then(function(data) {console.log(data);});

//On page load Initialization

function init() 
{
    d3.json(url).then(function(data) 
    {
        //Get selDataset from index.html
        let options = d3.select("#selDataset");
        let features = data.features; 
        let type1 = [];
        for (let j = 0; j < features.length; j++)
        {
            type1.push(features[j].properties.Volcano_Type);
        }

        let unique_type = type1.filter((item, i, ar) => ar.indexOf(item) === i);
                
        //Adding values in the dropdown box
        for(let i = 0 ; i < unique_type.length;i++)
        {
            options.append("option").text(unique_type[i]).attr("value",unique_type[i]);
        }
        
        //Initialize Charts
        getdata(unique_type[0]);    
        //open Map
        plotMap();
    });
}

//On change Dataset update Charts

d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly()
{
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let select_id = dropdownMenu.property("value");

    getdata(select_id);
    plotMap();
    
}

function getdata (sample_id)
{
    d3.json(url).then(function(data) 
    {
        let features = data.features;
        
        let vol_names = [];
        let elevation_values = [];
        let total_deaths = [];
        for(let i=0;i<features.length;i++)
        {   
            let properties = features[i].properties;
        
            let vol_type = properties.Volcano_Type;
            if(vol_type == sample_id)
            {
                let elev = properties.Elevation;
                let no_of_death = properties.Total_Deaths;
                if(elev != 0 && no_of_death != 0)
                {
                    vol_names.push(properties.Volcano_Name);
                    elevation_values.push(elev);
                    total_deaths.push(no_of_death);
                }
            }
        }
        
        plotbargraph(vol_names,elevation_values,sample_id);
        plotbubblegraph(vol_names,total_deaths,sample_id);
    });
}

function plotbargraph(names,elevations,type)
{
    let trace1 = {
        x: names,
        y: elevations,
        text: names,
        type: "bar",
      };
      //Create Layout
    let layout = {
        title : `Elevations vs Volcano Name for Volcano Type: ${type}`
    };  
    
    let chart_data = [trace1];
    
    //Plot Bar Chart
    Plotly.newPlot("bar", chart_data,layout);

}

function plotbubblegraph(names,deaths,type)
{
    let trace2 = {
        x: names,
        y: deaths,
        text: names,
        mode: "markers",
        marker: {
            color: "blue", // change the color to blue
            opacity:[1, 0.8, 0.6, 0.4],
            size: deaths.map(d => Math.sqrt(d) * 2.7) // Make the bubble size smaller
        }
      };
    let layout = {
        title : `Deaths vs Volcano Name for Volcano Type: ${type}`
    };  
    let chart_data1 = [trace2];
    //Plot
    Plotly.newPlot("bubble", chart_data1,layout);
}
 function plotMap()
{
    d3.json(url).then(createMarkers);
}

function createMap(volcanos) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
  
    // Create a baseMaps object to hold the streetmap and overlaymap layer.
    let baseMaps = {
      "Street Map": streetmap,
      "Topographic Map": topo
    };
  
    // Create an overlayMaps object to hold the volcanos layer.
    let overlayMaps = {
      "Volcanos" : volcanos
    }
  
    // Create the map object with options.
    let map = L.map("map", {
      center: [20.5, 78.9],
      zoom: 3,
      layers: [streetmap, volcanos]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  
    // Create a layer group that's made from the volcanos markers array, and pass it to the createMap function.
    function createMarkers(response) {
  
      // Pull the "features" property from response.features.
      let features = response.features;
      
      // Initialize an array to hold volcanos markers.
      let volcanoMarkers = [];
    
      // Loop through the feature array.
      for (let index = 0; index < features.length; index++) {
        let feature = features[index];
  
      // Initialise an object that contains icons for each layer group.  
        let myIcon = L.icon({
          iconUrl: "static/img/volcano.png",
          iconSize: [32, 32],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76]
      });
  
      //In the data , coordinates is string, so we need to convert to integer.
  
        let coord = feature.properties.Coordinates 
        let myArray = coord.split(",");
        let lon = parseFloat(myArray[0]);
        let lat = parseFloat(myArray[1]);
    
        // For each station, create a marker, and bind a popup with the volcano's name.
        let volcanoMarker = L.marker([lon,lat], {icon: myIcon})
          .bindPopup(`<h3> Name: ${feature.properties.Volcano_Name}</h3>
                     <h3> Country: ${feature.properties.Country}</h3>
                     <h3> Year: ${feature.properties.Year}</h3>
                     <h3> Status: ${feature.properties.Status}</h3>
                     <h3> Deaths: ${feature.properties.Deaths}</h3>`);
                    
    
        // Add the marker to the volcanoMarkers array.
        volcanoMarkers.push(volcanoMarker);
      }
      
    
      // Create a layer group that's made from the volcano markers array, and pass it to the createMap function.
      createMap(L.layerGroup(volcanoMarkers));
    }
  

init();
