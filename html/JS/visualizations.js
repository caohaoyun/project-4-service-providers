// JavaScript object mapping image file names to titles
const imageOptions = {
    scattermeanhousesizebyprice: {
        title: '1- Scatter Plot: Avg. House Size vs. Price',
        description: 'The plot showcases a positive correlation between house size and price, indicating that larger houses tend to have higher market values. ' +
        'Notably, the majority of the data points cluster within the quadrant of 0.01M to 4M, highlighting a prevalent market trend. This concentration suggests a significant demand for houses within this price range, reflecting regional housing preferences and economic factors.'
    },
    scatter_plots_house_size_price_grid: {
        title:'2- House Size vs. Price Scatter Plots Grid',
        description:'Generally, smaller houses tend to have lower prices. This correlation underscores the importance of house size as a determinant factor in housing prices across these regions. '+
        'However, it is important to note that while this pattern holds in a broad sense, there might be nuances within each state. Further exploration into individual states could reveal specific outliers or exceptions to this trend.'
    },
    scatter_plots_house_size_bedrooms_grid: {
        title:'3- Bedrooms vs. Price Scatter Plots Grid',
        description:'Typically, houses with more bedrooms show higher prices, reflecting the increased space and amenities they offer.  ' +
        'However, it is essential to explore outliers and exceptions within individual states. Variations in pricing trends could be influenced by various factors such as local economic conditions, urban development, or housing policies specific to each state.'
    },
    scatter_plots_house_size_bathrooms_grid: {
        title:'4- Bathrooms vs. Price Scatter Plots Grid',
        description: 'This graph explores how the number of bathrooms influences house prices across different regions. ' +
        'The scatter plots allow us to spot trends. Generally, houses with more bathrooms tend to have higher prices.  ' + 
        'This is intuitive as more bathrooms often mean larger or more luxurious homes, which naturally come at a higher price tag. However, it is interesting to look at each state individually. Variations might occur due to different preferences in certain regions, influencing the housing market in unexpected ways.'
    },
    scatter_plots_acre_price_grid: {
        title:'5- Acreage vs. Price Scatter Plots Grid',
        description: 'Generally, larger plots of land tend to have higher prices, especially in regions where spacious properties are in high demand.' +
        'This is often because larger acreages offer more possibilities for development, privacy, and amenities.' +
        'However, it is crucial to analyze deeper and observe each state individually. Variations in pricing and acreage preferences can be influenced by local regulations, market demands, and regional trends.'
    },
    scatter_state_vs_price: {
        title:'6- Scatter Plot State vs. Price',
        description: 'Valuable insights can be gained into the economic dynamics and housing demands specific to each state. Policymakers, investors, and homebuyers alike can leverage this visual representation to make informed decisions. '+
        'This visualization not only facilitates an immediate comparison of state-wise housing markets but also paves the way for a deeper exploration into the underlying factors influencing these price differentials.'
    },
    box_plots_pricebystate_grid: {
        title:'7- Price vs. State Box Plots',
        description: 'Each box plot corresponds to a specific state, providing a vivid representation of the price distribution within that state’s real estate market. '+
        'States with taller boxes and narrower IQRs indicate a more consistent pricing structure and less variability in housing costs. Conversely, states with wider boxes and extended whiskers signify a broader spectrum of housing prices, suggesting diverse real estate offerings.'
    },
    bar_median_grid: {
        title: '8- Median Price by State Bar Plots',
        description: 'In this visual we explore the dataset through three distinct lenses: the median, maximum, and minimum prices of homes. Each bar in these bar plots represents a range of prices and the frequency of homes falling within that range. '+
        'By collectively analyzing these plots, real estate stakeholders gain a comprehensive perspective on the diversity of housing markets across states.'
    },
    bar_bedbath_grid: {
        title:'9- Bedrooms vs. Bathrooms Bar Plots',
        description: 'By analyzing these histograms, crucial patterns in housing designs can be reviewed. '+
        'Whether it is emphasizing family-friendly layouts or promoting luxurious en-suite options, these insights provide the groundwork for more informed decisions in the real estate market.'
    },
    correlationmatrix: {
        title:'10- Correlation Matrix',
        description: 'Bedrooms exhibit a moderate positive correlation with bathrooms (0.60), unveiling the common trend of homes with more bedrooms having a higher number of bathrooms. '+
        'House size shows a strong positive correlation with both bedrooms and bathrooms. This signifies that larger houses tend to encompass more bedrooms and bathrooms. '+
        'The price of a property demonstrates noteworthy positive correlations with bedrooms, bathrooms, and house size. These correlations suggest that homes with more bedrooms, bathrooms, and larger overall size tend to command higher prices in the real estate market.'
    },
    bartop20citiesmosthouses: {
        title: '11- Top 20 Cities with Most Houses',
        description: 'This is a straightforward yet insightful view of the real estate landscape. The chart displays the top 20 cities with the highest number of houses, derived from our dataset covering 10 states '+
        'This wide spectrum underscores the varying scales of urban settlements within our dataset. Some cities, represented by the taller bars, exhibit a robust housing market with a high number of available properties. Conversely, cities with shorter bars indicate a more modest housing supply.'
    },
    bartop20citiesmostbedrooms: {
        title: '12- Top 20 Cities with Most Bedrooms',
        description: 'Examining the graph of the top 20 cities with the highest number of bedrooms gives us a glimpse into the varied housing landscapes within our dataset. Each bar represents a city, showcasing the quantity of bedrooms available in residences.'+
        'This analysis provides the housing preferences and trends within these cities. Some cities boast a wealth of larger homes with numerous bedrooms, likely catering to families or individuals seeking spacious living arrangements. Conversely, cities with fewer bedrooms might be characterized by a higher prevalence of smaller, cozier dwellings.'
    },
    bartop20citiesmostbaths: {
        title: '13- Top 20 Cities with Most Bathrooms',
        description: 'This graph sheds light on housing preferences within these cities. Cities with an abundance of bathrooms likely feature larger, upscale homes catering to individuals or families who value luxurious amenities. '+
        'Conversely, cities with fewer bathrooms might have a higher prevalence of more modest residences, suitable for individuals or smaller households.'
    },
    bartop10citieshighestmeanbedsandbaths: {
        title: '14- Top 10 Cities with Highest Avg. Bedrooms and Bathrooms',
        description: 'In this visualization, we explore cities where homes boast a significant number of bedrooms and bathrooms, indicating spacious and well-appointed living spaces.'+
        'Such cities are likely to appeal to families or individuals seeking generous living spaces, often reflecting affluence and a high quality of life.'+
        'Identifying areas where expansive homes are prevalent can provide crucial insights across multiple sectors, from real estate to urban planning. It offers a nuanced view of housing preferences, guiding investment decisions and market strategies.'
    },
    bartop20citiesaveragelotsize: {
        title: '15- Top 20 Cities with Average Lot Size',
        description: 'This graph offers valuable insights into cities characterized by generous average lot sizes, shedding light on residents` preferences for spacious outdoor areas. The bars represent these cities, indicating the average land area associated with each property.'+
        'The preference for larger lots signifies a collective desire for spacious, green environments, reflecting the residents` appreciation for nature and outdoor living.'
    },
    bartopcitieshousesizebystate: {
        title: '16- House size by State Bar Plots',
        description: 'This bar plot provides an insightful overview of the average house sizes across the ten states in the dataset. Each bar represents a state, and its height indicates the average square footage of houses in that state. The data reveals significant disparities in housing sizes, ranging from compact residences to more expansive homes.'
    },
    bartop20citiesaveragehousesize: {
        title: '17- Top 20 Cities with Average House Size',
        description: 'This bar chart provides a detailed insight into the average house sizes across the top 20 cities in the dataset. Each bar represents a city, showcasing the average square footage of homes. '+
        'The data highlights considerable diversity in housing sizes among these cities, ranging from compact residences to more spacious homes.'
    },
    bartop20citieshighestaverageprice: {
        title: '18- Top 20 Cities with Highest Average Price',
        description: 'This bar chart explores the top 20 cities with the highest average home prices, offering crucial insights into real estate markets. Each bar represents a city, providing a clear visual representation of their average home prices in millions of dollars.'+
        'Cities with high average home prices often indicate strong demand, making them attractive for new developments.'
    } 
};

// Populate the dropdown with image options
$(document).ready(function() {
    const dropdown = $('#image-dropdown');

    // Hide the description box and image on page load
    $('#description-box').hide();
    $('#selected-image').hide();

    $.each(imageOptions, function(key, value) {
        dropdown.append($('<option></option>').attr('value', key).text(value.title));
    });

    // Event listener for image dropdown change
    $('#image-dropdown').change(function() {
        const selectedImage = $(this).val();
        const selectedOption = imageOptions[selectedImage];

        // Display the description box and the selected image only if an option is selected
        if (selectedOption) {
            const selectedTitle = selectedOption.title;
            const selectedDescription = selectedOption.description;
            //$('#selected-image-title').text(selectedTitle);
            $('#description-text').text(selectedDescription);
            $('#description-box').show();

            // Display the selected image if it exists, otherwise hide the image
            if (selectedImage) {
                const imagePath = `../../Data/EDA_Images/${selectedImage}.png`;
                $('#selected-image').attr('src', imagePath);
                $('#selected-image').show();
            } else {
                $('#selected-image').hide();
            }
        } else {
            // Hide the description box and image if no valid option is selected
            $('#description-box').hide();
            $('#selected-image').hide();
        }
    });
});