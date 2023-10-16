// Define colors for different price ranges
const priceColors = [
    "#ff0000", // Red for high prices
    "#ffa500", // Orange for medium-high prices
    "#ffff00", // Yellow for medium prices
    "#008000", // Green for low prices
    "#0000ff", // Blue for very low prices
    "#008000"
];

document.addEventListener("DOMContentLoaded", async function () {
    let map = null;

    const stateEndpoints = [
        'connecticut', 'maine', 'massachusetts', 'newhampshire', 
        'newjersey', 'newyork', 'pennsylvania', 'puertorico', 
        'rhodeisland', 'vermont'
    ];

    async function loadDataForState(state) {
        const url = `http://127.0.0.1:5000/api/v1.0/state/${state}?limit=100`;
        try {
            const response = await fetch(url);
            const dataSections = await response.json();
    
            if (!Array.isArray(dataSections)) {
                throw new Error(`Invalid response format for state ${state}`);
            }
    
            const data = dataSections.reduce((accumulator, currentSection) => {
                return accumulator.concat(currentSection);
            }, []);
    
            return data;
        } catch (error) {
            throw new Error(`Error loading data for state ${state}: ${error.message}`);
        }
    }

    async function loadDataForAllStates() {
        const allData = await Promise.all(stateEndpoints.map(state => loadDataForState(state)));
        return allData.reduce((accumulator, currentData) => accumulator.concat(currentData), []);
    }
    
    async function updateMap(selectedState) {
        if (map) {
            map.remove();
        }

        const data = (selectedState === "All") ? await loadDataForAllStates() : await loadDataForState(selectedState);

        map = L.map('map-container').setView([41.9002646, -72.941968], 7);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 10,
            attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const markers = [];
        data.forEach(dt => {
            const lat = dt.latitude;
            const lon = dt.longitude;
            const city = dt.city;
            const state = dt.state;
            const price = dt.price;

            // Determine the color based on the price range
            let colorIndex;
            if (price > 1500000) {
                colorIndex = 0; // High prices (red)
            } else if (price > 800000) {
                colorIndex = 1; // Medium-high prices (orange)
            } else if (price > 600000) {
                colorIndex = 2; // Medium prices (yellow)
            } else if (price > 400000) {
                colorIndex = 3; // Low prices (green)
            } else if (price > 200000) {
                colorIndex = 4;
            } else {
                colorIndex = 5; // Very low prices (blue)
            }

            const marker = L.circleMarker([lat, lon], {
                radius: 7,
                fillColor: priceColors[colorIndex] || "#000000",
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });

            marker.bindPopup(`City: ${city} <br> State: ${state} <br> Price: $${price}`);
            markers.push(marker);
        });

        const markerCluster = L.markerClusterGroup();
        markerCluster.addLayers(markers);
        map.addLayer(markerCluster);
    }

    const stateDropdown = document.getElementById("state");

    stateEndpoints.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.text = state;
        stateDropdown.appendChild(option);
    });

    stateDropdown.value = "All";

    stateDropdown.addEventListener("change", function () {
        const selectedState = stateDropdown.value;
        updateMap(selectedState);
    });

    updateMap("All");
});