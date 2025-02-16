from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from JobRecommender import parse_resume  # Assuming parse_resume is a function that takes a file and returns parsed data
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
mongo_connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(mongo_connection_string)
db = client['Placement_Management_System']
users_collection = db['users']


@app.route('/')
def hello():
    return jsonify({"message": "Hello World!"})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    
    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400
    
    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"message": "Email already exists"}), 400

    hashed_password = generate_password_hash(password)
    
    user_data = {
        "username": username,
        "email": email,
        "password": hashed_password
    }
    
    try:
        users_collection.insert_one(user_data)
    except Exception as e:
        return jsonify({"message": f"Error creating user: {str(e)}"}), 500
    
    return jsonify({"message": "Signup successful", "email": email, "username": username})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = users_collection.find_one({"email": email})
    
    if user and check_password_hash(user['password'], password):
        return jsonify({"message": "Login successful", "email": email, "username": user['username']})
    else:
        return jsonify({"message": "Invalid email or password"}), 401

@app.route('/upload_resume', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    
    try:
        parsed_data = parse_resume(file)
        return jsonify({"message": "Resume parsed successfully", "data": parsed_data}), 200
    except Exception as e:
        return jsonify({"message": f"Error parsing resume: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
