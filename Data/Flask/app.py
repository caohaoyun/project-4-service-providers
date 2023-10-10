import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import sqlite3
import csv
from flask import Flask, jsonify, json
from flask_cors import CORS

app = Flask(__name__)

# Define the path to the directory containing your CSV files
csv_directory = '../new_data/Connecticut_properties.csv'

@app.route('/')
def index():
    # List all CSV files in the directory
    csv_files = os.listdir(csv_directory)
    return render_template('index.html', csv_files=csv_files)

@app.route('/download/<filename>')
def download_csv(filename):
    # Provide the ability to download a specific CSV file
    filepath = os.path.join(csv_directory, filename)
    return send_file(filepath, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)