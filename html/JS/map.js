const stateEndpoints = [
    'connecticut', 'maine', 'massachusetts', 'newhampshire', 
    'newjersey', 'newyork', 'pennsylvania', 'puertorico', 
    'rhodeislands', 'vermont'
];

async function loadDataForState(state) {
    const url = `http://127.0.0.1:5000/api/v1.0/state/${state}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`Data for state ${state}:`, data); // Log the API response
        if (Array.isArray(data)) {
            return data;
        } else {
            throw new Error(`Invalid data format for state ${state}`);
        }
    } catch (error) {
        throw new Error(`Error loading data for state ${state}: ${error.message}`);
    }
}

async function createMarkers(data) {
    if (!Array.isArray(data)) {
        console.error('Invalid data format');
        return;
    }

    const map = L.map('houseStates').setView([41.9002646, -87.941968], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 10,
        attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const bedColors = {
        "1": '#1f77b4', "2": '#ff7f0e', "3": '#2ca02c', "4": '#d62728', 
        "5": '#9467bd', "6": '#8c564b', "7": '#e377c2', "8": '#7f7f7f', 
        "9": '#bcbd22', "10": '#17becf', "11": '#1a1a1a', "12": '#ffddc1', 
        "13": '#c2c2c2', "14": '#98df8a', "15": '#c49c94', "16": '#f7b6d2', 
        "17": '#c5b0d5', "18": '#ff9896', "19": '#9467bd', "20": '#dbdb8d', 
        "21": '#9edae5', "22": '#bcbddc', "23": '#d9d9d9', "24": '#718c00'
    };

    const markers = [];
    data.forEach(dt => {
        const lat = dt.latitude;
        const lon = dt.longitude;
        const city = dt.city;
        const state = dt.state;
        const numBed = dt.bed;
        const bath = dt.bath;
        const houseSize = dt.house_size;
        const price = dt.price;
        const soldPreviously = dt.sold_previously;
    
        const marker = L.circleMarker([lat, lon], {
            radius: 7,
            fillColor: bedColors[numBed] || "#000000",
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        });

        marker.bindPopup(`City: ${city} <br> State: ${state} <br> House Size: ${houseSize} <br> Prize $: ${price} <br> Bed: ${numBed} <br> Bathrooms: ${bath}`);
        markers.push(marker);
    });

    const markerCluster = L.markerClusterGroup();
    markerCluster.addLayers(markers);
    map.addLayer(markerCluster);

    const numBeds = Object.keys(bedColors).map(Number).sort((a, b) => a - b);
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        div.className = 'legend-container';

        numBeds.forEach(numBed => {
            const color = bedColors[numBed];
            const colorLabel = `<div style="display: inline-block; width: 20px; height: 20px; background-color: ${color}"></div>`;
            div.innerHTML += `${colorLabel}&nbsp;&nbsp;<i>${numBed}</i><br />`;
        });
        return div;
    };
    legend.addTo(map);
}

async function updateMap(selectedState) {
    if (selectedState === "All") {
        const allData = await Promise.all(stateEndpoints.map(state => loadDataForState(state)));
        const mergedData = [].concat(...allData);
        createMarkers(mergedData);
    } else {
        const data = await loadDataForState(selectedState);
        createMarkers(data);
    }
}

const stateDropdown = document.getElementById("state");
stateDropdown.value = "All";

stateDropdown.addEventListener("change", function () {
    const selectedState = stateDropdown.value;
    updateMap(selectedState);
});

updateMap("All");