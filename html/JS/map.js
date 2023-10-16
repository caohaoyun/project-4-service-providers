// Load the JSON data
const url = "http://127.0.0.1:5000/api/v1.0/state/";
d3.json(url).then(function (data) {
    console.log("Loaded data:", data);
    // Define colors by number of beds 
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
        '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#1a1a1a',
        '#ffddc1', '#c2c2c2', '#98df8a', '#c49c94', '#f7b6d2', '#c5b0d5',
        '#ff9896', '#9467bd', '#dbdb8d', '#9edae5', '#bcbddc', '#d9d9d9',
        '#718c00']

    //Map number of beds by color 
    const bedColors = {
        "1": colors[0], "2": colors[1], "3": colors[2], "4": colors[3], 
        "5": colors[4], "6": colors[5], "7": colors[6], "8": colors[7], 
        "9": colors[8], "10": colors[9], "11": colors[10], "12": colors[11],
        "13": colors[12], "14": colors[13], "15": colors[14], "16": colors[15],
        "16": colors[15], "17": colors[16], "18": colors[17], "19": colors[18],
        "20": colors[19], "21": colors[20], "22": colors[21], "23": colors[22],
        "24": colors[23]
    };
 // Function to get the color of a number of beds
    function getBedColors(numBed) {
        return bedColors[numBed] || "#000000"; // Default color for unknown types
    }
    // Extract number of beds and states from the data
    const numBeds = [...new Set(data.map(entry => entry.bed))];
    numBeds.sort();
    const states = [...new Set(data.map(entry => entry.state))];
    states.sort();

    // Create the map
    const map = L.map('houseStates').setView([41.9002646, -87.941968], 7);

    // Add base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 10,
        attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create a legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');

        // Add a class to the legend for styling
    div.className = 'legend-container';

        for (const numBed of numBeds) {
            const color = getBedColors(numBed);
            const colorLabel = `<div style="display: inline-block; width: 20px; height: 20px; background-color: ${color}"></div>`;
            div.innerHTML +=
                `${colorLabel}&nbsp;&nbsp;<i>${numBed}</i><br />`;
        }
        return div;
    };
    legend.addTo(map);

    // Create an array to hold all markers
    const markers = [];

    // Add markers for each station
    data.forEach(dt => {
        const lat = dt.latitude;
        const lon = dt.longitude;
        const city = dt.city;
        const state = dt.state;
        const numBed = dt.bed;
        const bath = dt.bath;
        const houseSize = dt.house_size
        const price = dt.price;
        const sorldPreviously = dt.sold_previously;
    
        const marker = L.circleMarker([lat, lon], {
            radius: 7,
            fillColor: getBedColors(numBed),
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        });

        marker.bindPopup(`City: ${city} <br> State: ${state} <br> House Size: ${houseSize} <br> Prize $: ${price} <br> Bed: ${bed} <br> Bathrooms: ${bath}`);
        markers.push({ marker, numBed});
    });

    // Add all markers to the map
    markers.forEach(mark => {
        mark.marker.addTo(map);
    });

    // Populate the dropdown options
    const stateDropdown = document.getElementById("stateDropdown");

    // Add an option for "All States" to show all data initially
    const allStatesOption = document.createElement("option");
    allStatesOption.value = "All";
    allStatesOption.text = "All States";
    stateDropdown.appendChild(allStatesOption);

    // Add options for each state
    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.text = state;
        stateDropdown.appendChild(option);
    });

  // Function to filter and update the map based on the selected state
  stateDropdown.value = "all";

  stateDropdown.addEventListener("change", function () {
        const selectedState = stateDropdown.value;

        markers.forEach(mark => {
            const isVisible = selectedState === "all" || selectedState === mark.state;
            if (isVisible) {
                map.addLayer(mark.marker);
            } else {
                map.removeLayer(mark.marker);
            }
        });
    });
    updateMap("All");
});
