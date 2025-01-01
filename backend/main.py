from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

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
    print('hello')
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    
    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400
    
    user_data = {
        "email": email,
        "password": password
    }
    
    users_collection.insert_one(user_data)
    
    return jsonify({"message": "Signup successful", "email": email})

if __name__ == '__main__':
    app.run(debug=True)
