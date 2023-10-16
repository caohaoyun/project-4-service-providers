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



// Function for city scroll bar:

const citySelect = document.getElementById('city');

    stateSelect.addEventListener('change', () => {
    const selectedState = stateSelect.value.replace(" ", "").toLowerCase();
    citySelect.innerHTML = '<option value="">Select a City</option>'; // Clear existing options and reset to default

    if (selectedState) {
        fetch(`http://127.0.0.1:5000/api/v1.0/state/${selectedState}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the API response data to inspect its structure

                const uniqueCities = new Set();

                data.forEach(item => {
                    uniqueCities.add(item.city);
                });

                // Convert the set of unique cities into an alphabetically sorted array
                const sortedCities = Array.from(uniqueCities).sort();

                sortedCities.forEach(city => {
                    const option = document.createElement('option');
                    option.text = city;
                    option.value = city;
                    citySelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});

//Function for the zip code
const zipCodeSelect = document.getElementById('zip_code');

citySelect.addEventListener('change', () => {
    const selectedCity = citySelect.value;
    const selectedState = stateSelect.value.replace(" ", "").toLowerCase();
    zipCodeSelect.innerHTML = '<option value="">Select a Zip Code</option>'; // Clear existing options and reset to default

    if (selectedCity) {
        fetch(`http://127.0.0.1:5000/api/v1.0/state/${selectedState}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); 

                const uniqueZipCodes = new Set();

                data
                    .filter(item => item.city === selectedCity) // Filter data for the selected city
                    .forEach(item => {
                        uniqueZipCodes.add(item.zip_code);
                    });

                Array.from(uniqueZipCodes).forEach(zipCode => {
                    const option = document.createElement('option');
                    option.text = zipCode;
                    option.value = zipCode;
                    zipCodeSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});

const acresInput = document.getElementById('acres');
const houseSizeInput = document.getElementById('house_size');
const saveButton = document.getElementById('save-button');
const new_data = {
    'bed': [],
    'bath': [],
    'acre_lot': [],
    'house_size': [],
    'sold_previously': [],
    'city': [],
    'zip_code': []
};

saveButton.addEventListener('click', () => {
    const selectedState = stateSelect.value;
    const selectedBedrooms = bedroomsSelect.value;
    const selectedBathrooms = bathroomsSelect.value;
    const acresValue = parseFloat(acresInput.value);
    const houseSizeValue = parseInt(houseSizeInput.value);
    const selectedCity = citySelect.value;
    const selectedZipCode = zipCodeSelect.value;
    const soldPreviouslyValue = document.getElementById('sold_previously').value === 'yes' ? 1 : 0;
    
    let errorMessage = '';

    if (!selectedState) {
        errorMessage += 'Please select a state.\n';
    }

    if (!selectedBedrooms) {
        errorMessage += 'Please select the number of bedrooms.\n';
    }

    if (!selectedBathrooms) {
        errorMessage += 'Please select the number of bathrooms.\n';
    }

    if (isNaN(acresValue) || acresValue < 0.01 || acresValue > 17.3) {
        errorMessage += 'Acre value must be between 0.01 and 17.3.\n';
    }

    if (isNaN(houseSizeValue) || houseSizeValue < 140 || houseSizeValue > 34000) {
        errorMessage += 'House size must be between 140 and 34000.\n';
    }

    if (!selectedCity) {
        errorMessage += 'Please select a city.\n';
    }

    if (!selectedZipCode) {
        errorMessage += 'Please select a zip code.\n';
    }

    if (errorMessage) {
        alert(errorMessage);
    } else {


    // Add the selected options to the new_data object
    new_data.bed.push(selectedBedrooms);
    new_data.bath.push(selectedBathrooms);
    new_data.acre_lot.push(acresValue);
    new_data.house_size.push(houseSizeValue);
    new_data.sold_previously.push(soldPreviouslyValue);
    new_data.city.push(selectedCity);
    new_data.zip_code.push(selectedZipCode);

    // Log the new_data object (you can send it to your backend or use it as needed)
    console.log(new_data);
}});


});
