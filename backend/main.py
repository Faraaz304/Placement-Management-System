from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
client = MongoClient("your_mongodb_atlas_connection_string")
db = client['your_database_name']
users_collection = db['users']

@app.route('/')
def hello():
    return jsonify({"message": "Hello World!"})

@app.route('/signup', methods=['POST'])
def signup():
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
