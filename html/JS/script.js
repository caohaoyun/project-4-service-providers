// Function of first 2 scroll bars - State and Bedrooms
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state');
    const bedroomsSelect = document.getElementById('bedrooms');
    const bathroomsSelect = document.getElementById('bathrooms');

    const states = ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "New Jersey", "New York", "Pennsylvania", "Puerto Rico", "Rhode Island", "Vermont"];

    // Populate the state dropdown
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    // Add an event listener to the state select element to populate bedrooms
    stateSelect.addEventListener('change', () => {
        const selectedState = stateSelect.value.replace(" ", "").toLowerCase();
        bedroomsSelect.innerHTML = ''; // Clear the existing options

        if (selectedState) {
            fetch(`http://127.0.0.1:5000/api/v1.0/state/${selectedState}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Log the API response data to inspect its structure

                    // Populate the "Select Bedrooms" dropdown with the unique values
                    const defaultOption = document.createElement('option');
                    defaultOption.text = 'Select Bedrooms';
                    defaultOption.value = '';
                    bedroomsSelect.appendChild(defaultOption);

                    const uniqueBedrooms = new Set(); // Use a Set to store unique values

                    data.forEach(item => {
                        uniqueBedrooms.add(item.bed); // Ensures "bed" is treated as a number
                    });

                    // Convert the Set back to an array and sort it
                    const sortedBedrooms = Array.from(uniqueBedrooms).sort((a, b) => a - b);

                    sortedBedrooms.forEach(value => {
                        const option = document.createElement('option');
                        option.text = value;
                        option.value = value;
                        bedroomsSelect.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    });

// Function of 3rd scroll bar - Bathrooms
// Add an event listener to the bedrooms select element to populate bathrooms based on the selected state and bedrooms
bedroomsSelect.addEventListener('change', () => {
    const selectedState = stateSelect.value.replace(" ", "").toLowerCase();
    const selectedBedrooms = bedroomsSelect.value;

    bathroomsSelect.innerHTML = ''; // Clear the existing options

    if (selectedState && selectedBedrooms) {
        fetch(`http://127.0.0.1:5000/api/v1.0/state/${selectedState}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the API response data to inspect its structure

                // Filter the data to include only rows with matching bedrooms value
                const filteredData = data.filter(item => typeof item.bed === 'number' && item.bed === parseFloat(selectedBedrooms));

                // Populate the "Select Bathrooms" dropdown with the unique values
                const defaultOption = document.createElement('option');
                defaultOption.text = 'Select Bathrooms';
                defaultOption.value = '';
                bathroomsSelect.appendChild(defaultOption);

                const uniqueBathrooms = new Set();

                // Extract unique bathroom values from the filtered data
                filteredData.forEach(item => {
                    uniqueBathrooms.add(item.bath);
                });

                const sortedBathrooms = Array.from(uniqueBathrooms).sort((a, b) => a - b);

                sortedBathrooms.forEach(value => {
                    const option = document.createElement('option');
                    option.text = value;
                    option.value = value;
                    bathroomsSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});



});

// Function for acre and house size 

const acresInput = document.getElementById('acres');
const houseSizeInput = document.getElementById('house_size');
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', () => {
    const acresValue = parseFloat(acresInput.value);
    const houseSizeValue = parseInt(houseSizeInput.value);
    let errorMessage = "";

    if (isNaN(acresValue) || acresValue < 0.01) {
        errorMessage += "Acre value can't be less than 0.01.\n";
    } else if (acresValue > 17.3) {
        errorMessage += "Acre value can't be greater than 17.3.\n";
    }

    if (isNaN(houseSizeValue) || houseSizeValue < 140) {
        errorMessage += "House size can't be less than 140 ft.\n";
    } else if (houseSizeValue > 34000) {
        errorMessage += "House size can't be greater than 34000 ft.\n";
    }

    if (errorMessage !== "") {
        alert(errorMessage);
    } else {
        // Continue with the save operation or other actions here
    }
});




