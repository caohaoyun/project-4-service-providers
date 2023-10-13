// JavaScript object mapping image file names to titles
const imageOptions = {
    correlationmatrix: 'Correlation Matrix',
    scatter_plothouse_size_vs_price: 'Scatter Plot: House Size vs. Price',
    scatter_plots_house_size_price_grid: 'House Size vs. Price Scatter Plots',
    scatter_plots_house_size_bedrooms_grid: 'House Size vs. Bedrooms Scatter Plots',
    scatter_plots_house_size_bathrooms_grid: 'House Size vs. Bathrooms Scatter Plots',
    scatter_plots_acre_price_grid: 'Acreage vs. Price Scatter Plots',
    scatter_plots_pricebystate_grid: 'Price vs. State Scatter Plots',
    box_plots_pricebystate_grid: 'Price vs. State Box Plots',
    bar_median_grid: 'Median Price by State Bar Plots',
    bar_bedbath_grid: 'Bedrooms vs. Bathrooms Bar Plots',
    bartop20citiesmosthouses: 'Top 20 Cities with Most Houses',
    bartop10citieshighestmeanbedsandbaths: 'Top 10 Cities with Highest Mean Bedrooms and Bathrooms',
    bartop20citiesmostbedrooms: 'Top 20 Cities with Most Bedrooms',
    bartop20citiesmostbaths: 'Top 20 Cities with Most Bathrooms',
    bartop20citiesaveragelotsize: 'Top 20 Cities with Average Lot Size',
    bartop20citiesaveragehousesize: 'Top 20 Cities with Average House Size',
    bartopcitieshousesizebystate: 'Housesize by State Bar Plots',
    bartop20citieshighestaverageprice: 'Top 20 Cities with Highest Average Price',
    scattermeanhousesizebyprice: 'Scatter Plot: Mean House Size vs. Price'
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
        
        // Display the selected image (assuming the images are in the Data/EDA_Images directory)
        const imagePath = `Data/EDA_Images/${selectedImage}.png`;
        $('#selected-image').attr('src', imagePath);
    });
});





