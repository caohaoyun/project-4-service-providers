document.addEventListener("DOMContentLoaded", async function () {
    const stateEndpoints = [
        'connecticut', 'maine', 'massachusetts', 'newhampshire', 
        'newjersey', 'newyork', 'pennsylvania', 'puertorico', 
        'rhodeisland', 'vermont'
    ];

    const bedColors = {
        1: 'red',
        2: 'blue',
        3: 'green',
        4: 'orange',
        5: 'purple',
        6: 'brown',
        7: 'pink',
        8: 'yellow',
        9: 'cyan',
        10: 'magenta',
        11: 'violet',
        12: 'lime',
        13: 'indigo',
        14: 'olive',
        15: 'teal',
        16: 'navy',
        17: 'salmon',
        18: 'maroon',
        19: 'gold',
        20: 'coral',
        21: 'silver',
        22: 'aquamarine',
        23: 'lavender',
        24: 'peru',
        25: 'tomato'
        // Add more colors for different bedroom numbers if needed
    };

    async function loadDataForState(state) {
        const url = `http://127.0.0.1:5000/api/v1.0/state/${state}?limit=50`;
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
    
    let map = null;
    let markers = [];

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

        markers = [];

        data.forEach(dt => {
            const lat = dt.latitude;
            const lon = dt.longitude;
            const numBed = dt.bed;

            const marker = L.circleMarker([lat, lon], {
                radius: 7,
                fillColor: bedColors[numBed] || "#000000",
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });

            marker.addTo(map);
            marker.bindPopup(`Number of Bedrooms: ${numBed}`);
            markers.push(marker);
        });
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