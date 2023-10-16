// document.addEventListener('DOMContentLoaded', function() {
//     const stateSelect = document.getElementById('state');
//     const bedroomsSelect = document.getElementById('bedrooms');
//     const bathroomsSelect = document.getElementById('bathrooms');
//     const citySelect = document.getElementById('city');
//     const zipCodeSelect = document.getElementById('zip_code');
//     const acresInput = document.getElementById('acres');
//     const houseSizeInput = document.getElementById('house_size');
//     const saveButton = document.getElementById('save-button');
//     const new_data = {
//         'bed': [],
//         'bath': [],
//         'acre_lot': [],
//         'house_size': [],
//         'sold_previously': [],
//         'city': [],
//         'zip_code': []
//     };

//     saveButton.addEventListener('click', () => {
//         const selectedState = stateSelect.value;
//         const selectedBedrooms = bedroomsSelect.value;
//         const selectedBathrooms = bathroomsSelect.value;
//         const acresValue = parseFloat(acresInput.value);
//         const houseSizeValue = parseInt(houseSizeInput.value);
//         const selectedCity = citySelect.value;
//         const selectedZipCode = zipCodeSelect.value;
//         const soldPreviouslyValue = document.getElementById('sold_previously').value === 'yes' ? 1 : 0;

//         let errorMessage = '';

//         if (!selectedState) {
//             errorMessage += 'Please select a state.\n';
//         }

//         if (!selectedBedrooms) {
//             errorMessage += 'Please select the number of bedrooms.\n';
//         }

//         if (!selectedBathrooms) {
//             errorMessage += 'Please select the number of bathrooms.\n';
//         }

//         if (isNaN(acresValue) || acresValue < 0.01 || acresValue > 17.3) {
//             errorMessage += 'Acre value must be between 0.01 and 17.3.\n';
//         }

//         if (isNaN(houseSizeValue) || houseSizeValue < 140 || houseSizeValue > 34000) {
//             errorMessage += 'House size must be between 140 and 34000.\n';
//         }

//         if (!selectedCity) {
//             errorMessage += 'Please select a city.\n';
//         }

//         if (!selectedZipCode) {
//             errorMessage += 'Please select a zip code.\n';
//         }

//         if (errorMessage) {
//             alert(errorMessage);
//         } else {
//             // Add the selected options to the new_data object
//             new_data.bed.push(selectedBedrooms);
//             new_data.bath.push(selectedBathrooms);
//             new_data.acre_lot.push(acresValue);
//             new_data.house_size.push(houseSizeValue);
//             new_data.sold_previously.push(soldPreviouslyValue);
//             new_data.city.push(selectedCity);
//             new_data.zip_code.push(selectedZipCode);

//             // Log the new_data object (you can send it to your backend or use it as needed)
//             console.log(new_data);

//             // Prepare the input data to send to the API
//             const input_data = {
//                 'selected_state': selectedState, // Include the selected state
//                 'bed': selectedBedrooms,
//                 'bath': selectedBathrooms,
//                 'acre_lot': acresValue,
//                 'house_size': houseSizeValue,
//                 'sold_previously': soldPreviouslyValue,
//                 'city_encoded': selectedCity,
//                 'zip_encoded': selectedZipCode
//             };

//             // Send a POST request to the Flask API
//             fetch('http://127.0.0.1:5000/api/v1.0/predict_price', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(input_data), // Send the input_data object as JSON
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     // Update the predicted price in the HTML
//                     const predictedPriceSpan = document.getElementById('predicted-price');
//                     predictedPriceSpan.textContent = `$${data.predicted_price}`;
//                     document.getElementById('prediction-result').style.display = 'block'; // Show the result
//                 })
//                 .catch(error => {
//                     console.error('Error fetching data:', error);
//                 });
//         }
//     });
// });