import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

database_path = os.path.abspath('Data\Flask\new_database2.db')

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
    """List all available API routes."""
    return (
        "Available Routes:<br/>"
        "Data for a specific state: /api/v1.0/state/{state_name}<br/>"
    )

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

if __name__ == '__main__':
    app.run(debug=True)