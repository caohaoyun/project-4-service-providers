    // Load the JSON data
const url = `http://127.0.0.1:5000/api/v1.0/state/${selectedState}`;
d3.json(url)
    .then(function (data) {
        console.log("Loaded data:", data);
    })
    .catch(function (error) {
        console.error('Error loading data:', error);
    });

    // Define colors for fuel types
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

    //Map each State by color 
    const StateColors = {
        "connecticut": colors[0], 
        "maine": colors[1], 
        "massachusetts": colors[2], 
        "newhampshire": colors[3], 
        "newjersey": colors[4], 
        "newyork": colors[5], 
        "pennsylvania": colors[6], 
        "puertorico": colors[7], 
        "rhodeisland": colors[8], 
        "vermont" : colors[9],
    };
 // Function to get the color of a State
 function getStateColors(States) {
    return StateColors[States] || "#000000"; // Default color for unknown types
}


// URLS = [
//     "http://127.0.0.1:5000/api/v1.0/state/connecticut",
//     "http://127.0.0.1:5000/api/v1.0/state/maine",
//     "http://127.0.0.1:5000/api/v1.0/state/massachusetts",
//     "http://127.0.0.1:5000/api/v1.0/state/newhampshire",
//     "http://127.0.0.1:5000/api/v1.0/state/newyork",
//     "http://127.0.0.1:5000/api/v1.0/state/pennsylvania",
//     "http://127.0.0.1:5000/api/v1.0/state/puertorico",
//     "http://127.0.0.1:5000/api/v1.0/state/rhodeisland",
//     "http://127.0.0.1:5000/api/v1.0/state/vermont",
// ]


// const URLS = [
//     "http://127.0.0.1:5000/api/v1.0/state/connecticut",
//     "http://127.0.0.1:5000/api/v1.0/state/maine",
//     "http://127.0.0.1:5000/api/v1.0/state/massachusetts",
//     "http://127.0.0.1:5000/api/v1.0/state/newhampshire",
//     "http://127.0.0.1:5000/api/v1.0/state/newyork",
//     "http://127.0.0.1:5000/api/v1.0/state/pennsylvania",
//     "http://127.0.0.1:5000/api/v1.0/state/puertorico",
//     "http://127.0.0.1:5000/api/v1.0/state/rhodeisland",
//     "http://127.0.0.1:5000/api/v1.0/state/vermont",
// ]
// const URLS = fetch(
//     'http://127.0.0.1:5000/api/v1.0/state/ct',
//     'http://127.0.0.1:5000/api/v1.0/state/me',
//     'http://127.0.0.1:5000/api/v1.0/state/ma',
//     'http://127.0.0.1:5000/api/v1.0/state/nh',
//     'http://127.0.0.1:5000/api/v1.0/state/nj',
//     'http://127.0.0.1:5000/api/v1.0/state/ny',
//     'http://127.0.0.1:5000/api/v1.0/state/pa',
//     'http://127.0.0.1:5000/api/v1.0/state/pr',
//     'http://127.0.0.1:5000/api/v1.0/state/ri',
//     'http://127.0.0.1:5000/api/v1.0/state/vt',
// )