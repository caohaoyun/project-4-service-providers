import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS
import os
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Get the directory where the script is located
script_directory = os.path.dirname(os.path.abspath(__file__))

# Define the full path to the database file
database_path = os.path.join(script_directory, 'new_database2.db')

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

# @app.route('/api/v1.0/state/<string:state_name>/bedrooms', methods=['GET'])
# def get_bedroom_values(state):
#     # Query the database table for the given state (e.g., 'connecticut')
#     # Fetch unique values for bedrooms from that table
#     # Return the unique bedroom values as a JSON response
#     # Modify this part to interact with your database
#     bedroom_values = query_bedroom_values(state)
#     return jsonify(bedroom_values)
    

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

if __name__ == '__main__':
    app.run(debug=True)