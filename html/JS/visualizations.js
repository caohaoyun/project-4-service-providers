// JavaScript object mapping image file names to titles
const imageOptions = {
    scatter_plothouse_size_vs_price: '1- Scatter Plot: House Size vs. Price',
    scatter_plots_house_size_price_grid: '2- House Size vs. Price Scatter Plots Grid',
    scatter_plots_house_size_bedrooms_grid: '3- Bedrooms vs. Price Scatter Plots Grid',
    scatter_plots_house_size_bathrooms_grid: '4- Bathrooms vs. Price Scatter Plots Grid',
    scatter_plots_acre_price_grid: '5- Acreage vs. Price Scatter Plots Grid',
    scatter_state_vs_price: '6- Scatter Plot State vs. Price',
    box_plots_pricebystate_grid: '7- Price vs. State Box Plots',
    bar_median_grid: '8- Median Price by State Bar Plots',
    bar_bedbath_grid: '9- Bedrooms vs. Bathrooms Bar Plots',
    correlationmatrix: '10- Correlation Matrix',
    bartop20citiesmosthouses: '11- Top 20 Cities with Most Houses',
    bartop20citiesmostbedrooms: '12- Top 20 Cities with Most Bedrooms',
    bartop20citiesmostbaths: '13- Top 20 Cities with Most Bathrooms',
    bartop10citieshighestmeanbedsandbaths: '14- Top 10 Cities with Highest Avg. Bedrooms and Bathrooms',
    bartop20citiesaveragelotsize: '15- Top 20 Cities with Average Lot Size',
    bartopcitieshousesizebystate: '16- House size by State Bar Plots',
    bartop20citiesaveragehousesize: '17- Top 20 Cities with Average House Size',
    bartop20citieshighestaverageprice: '18- Top 20 Cities with Highest Average Price',
    scattermeanhousesizebyprice: '19- Scatter Plot: Avg. House Size vs. Price',
    
};

// Populate the dropdown with image options
$(document).ready(function() {
    const dropdown = $('#image-dropdown');
    $.each(imageOptions, function(key, value) {
        dropdown.append($('<option></option>').attr('value', key).text(value));
    });

    // Event listener for image dropdown change
    $('#image-dropdown').change(function() {
        const selectedImage = $(this).val();
        const selectedTitle = $('#image-dropdown option:selected').text();
        $('#selected-image-title').text(selectedTitle);
        
        // Display the selected image
        const imagePath = `../../Data/EDA_Images/${selectedImage}.png`;
        $('#selected-image').attr('src', imagePath);
    });
});





