import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)



# Get the directory where the script is located
script_directory = os.path.dirname(os.path.abspath(__file__))

# Define the full path to the database file
database_path = os.path.join(script_directory, 'new_database2.db')
pkl_path = os.path.join(script_directory, "PKL")

# Function to fetch data from a specific state's table
def read_data_from_database(state):
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()
    cursor.execute(f'SELECT "ID","bed","bath","acre_lot", "city", "state", "zip_code", "house_size", "price", "sold_previously", "latitude","longitude" FROM {state}')
    users = cursor.fetchall()
    conn.close()
    return users

@app.route("/")
def home():
    return """ <h1><strong> Welcome to the East Coast House Listing API</strong> </h1>
    <ul>
    <li><h2>Choose one of the following APIs</h2></li>
    <li><a href = "/api/v1.0/state/connecticut" target = "_blank"> Connecticut's Listing  </a> <strong>/api/v1.0/state/connecticut</strong></li>
    <li><a href = "/api/v1.0/state/maine" target = "_blank"> Maine's Listing  </a> <strong>/api/v1.0/state/maine</strong></li>
    <li><a href = "/api/v1.0/state/massachusetts" target = "_blank"> Massachusetts's Listing  </a> <strong>/api/v1.0/state/massachusetts</strong></li>
    <li><a href = "/api/v1.0/state/newhampshire" target = "_blank"> New hampshire's Listing  </a> <strong>/api/v1.0/state/newhampshire</strong></li>
    <li><a href = "/api/v1.0/state/newjersey" target = "_blank"> New Jersey's Listing  </a> <strong>/api/v1.0/state/newjersey</strong></li>
    <li><a href = "/api/v1.0/state/newyork" target = "_blank"> New York's Listing  </a> <strong>/api/v1.0/state/newyork</strong></li>
    <li><a href = "/api/v1.0/state/pennsylvania" target = "_blank"> Pennsylvania's Listing  </a> <strong>/api/v1.0/state/pennsylvania</strong></li>
    <li><a href = "/api/v1.0/state/puertorico" target = "_blank"> Puerto Rico's Listing  </a> <strong>/api/v1.0/state/puertorico</strong></li>
    <li><a href = "/api/v1.0/state/rhodeislands" target = "_blank"> Rhode Islands's Listing  </a> <strong>/api/v1.0/state/rhodeislands</strong></li>
    <li><a href = "/api/v1.0/state/vermont" target = "_blank"> Vermont's Listing  </a> <strong>/api/v1.0/state/vermont</strong></li>
    </ul>

"""
@app.route('/api/v1.0/state/<string:state_name>')
def get_state_data(state_name):
    if state_name not in ["connecticut", "maine", "massachusetts", "newhampshire", "newjersey", "newyork", "pennsylvania", "puertorico", "rhodeisland", "vermont"]:
        return jsonify({"error": "Invalid state name"})
    
    users_data = read_data_from_database(state_name)
    dataset = []

    for d in users_data:
        line = {
            "ID": d[0],
            "bed": d[1],
            "bath": d[2],
            "acre_lot": d[3],
            "city": d[4],
            "state": d[5],
            "zip_code": d[6],
            "house_size": d[7],
            "price": d[8],
            "sold_previously": d[9],
            "latitude": d[10],
            "longitude": d[11]
        }
        dataset.append(line)

    return jsonify(dataset)

@app.route('/api/v1.0/predict_price', methods=['POST'])
def predict_price():
    data = request.json

    # Ensure that the input data includes the selected state
    if 'selected_state' not in data:
        return jsonify({"error": "Missing selected state"}), 400

    selected_state = data['selected_state']
    model_file = f"{pkl_path}/{selected_state.replace(' ','').lower()}/{selected_state.replace(' ','').lower()}.pkl"  # Construct the model file name

    # Check if the model file exists
    if not os.path.exists(model_file):
        return jsonify({"error": "Model not found for the selected state"}), 400

    # Load the selected model
    selected_model = joblib.load(model_file)

    # Load the corresponding city and zip encoders
    city_encoder_file = f"{pkl_path}/{selected_state.replace(' ','').lower()}/{selected_state.replace(' ','').lower()}_CE.pkl"
    zip_encoder_file = f"{pkl_path}/{selected_state.replace(' ','').lower()}/{selected_state.replace(' ','').lower()}_ZE.pkl"
    city_encoder = joblib.load(city_encoder_file)
    zip_encoder = joblib.load(zip_encoder_file)

    # Ensure the input data matches the model's input features
    expected_features = ['bed', 'bath', 'acre_lot', 'house_size', 'sold_previously', 'city_encoded', 'zip_encoded']
    for feature in expected_features:
        if feature not in data:
            return jsonify({"error": f"Missing feature: {feature}"}), 400

    # Encode the selected city and zip code using the loaded encoders
    data['city_encoded'] = city_encoder.transform([data['city_encoded']])[0]
    data['zip_encoded'] = zip_encoder.transform([data['zip_encoded']])[0]

    # Create a DataFrame from the input data
    input_data = pd.DataFrame(data, index=[0])

    # Use the selected Linear Regression model to make predictions
    predicted_price = selected_model.predict(input_data)

    # Return the predicted price as JSON
    return jsonify({"predicted_price": predicted_price[0]})

if __name__ == '__main__':
    app.run(debug=True)