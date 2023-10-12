const stateSelect = document.getElementById('state');
const bedroomsSelect = document.getElementById('bedrooms');

// script.js
document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state');
    const states = ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "New Jersey", "New York", "Pennsylvania", "Puerto Rico", "Rhode Island", "Vermont"];

    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
});


        // Add an event listener to the state select element to populate bedrooms
        stateSelect.addEventListener('change', () => {
            const selectedState = stateSelect.value;

            fetch(`/api/your-api-endpoint?state=${selectedState}`)
                .then(response => response.json())
                .then(data => {
                    // Populate the "Select Bedrooms" dropdown with the unique values
                    bedroomsSelect.innerHTML = '';
                    const defaultOption = document.createElement('option');
                    defaultOption.text = 'Select Bedrooms';
                    defaultOption.value = '';
                    bedroomsSelect.appendChild(defaultOption);

                    data.forEach(value => {
                        const option = document.createElement('option');
                        option.text = value;
                        option.value = value;
                        bedroomsSelect.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });