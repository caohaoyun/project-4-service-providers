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
                        uniqueBedrooms.add(item.bed); // Ensure "bed" is treated as a number
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

        // Add an event listener to the state select element to populate bedrooms
    stateSelect.addEventListener('change', () => {
        const selectedState = stateSelect.value.replace(" ", "").toLowerCase();
        bathroomsSelect.innerHTML = ''; // Clear the existing options

        if (selectedState) {
            fetch(`http://127.0.0.1:5000/api/v1.0/state/${selectedState}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Log the API response data to inspect its structure

                    // Populate the "Select Bedrooms" dropdown with the unique values
                    const defaultOption = document.createElement('option');
                    defaultOption.text = 'Select Bathrooms';
                    defaultOption.value = '';
                    bathroomsSelect.appendChild(defaultOption);

                    const uniqueBathrooms = new Set(); // Use a Set to store unique values

                    data.forEach(item => {
                        uniqueBathrooms.add(item.bath); // Ensure "baths" is treated as a number
                    });

                    // Convert the Set back to an array and sort it
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

