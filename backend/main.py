import os
import dotenv
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pymongo import MongoClient
from PyPDF2 import PdfReader
from huggingface_hub import InferenceClient

# Load environment variables from .env file
dotenv.load_dotenv()
token = os.getenv("HUGGING_FACE_API")

app = Flask(__name__, template_folder='templates')
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['Placement_Management']  # Replace with your database name
users_collection = db['Users']  # Replace with your collection name
jobs_collection = db['Jobs'] 

client = InferenceClient(
    "mistralai/Mistral-Small-Instruct-2409",
    token=token,
)

# Function to extract text from the uploaded PDF resume
def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
    return text

@app.route('/' , methods=['GET' , 'POST'])
def index():
    return jsonify({'suggestions': 'Welcome to the Placement Management System'})

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    jobs = list(jobs_collection.find())  # Retrieve all jobs from the collection
    for job in jobs:
        job['_id'] = str(job['_id'])  # Convert ObjectId to string for JSON serialization
    
    return jsonify(jobs)  # Return the jobs as JSON

@app.route('/api/signup', methods=['POST', 'GET'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if user already exists
    if users_collection.find_one({"username": username}):
        return jsonify({'message': 'User already exists'}), 400

    # Insert new user into MongoDB
    users_collection.insert_one({"username": username, "password": password , "role": "user" } )
    return jsonify({'message': 'User created successfully' }), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Validate user credentials
    user = users_collection.find_one({"username": username})
    if user and user['password'] == password:
        return jsonify({'message': 'Login successful' , "role":user['role']}), 200
    return jsonify({'message': 'Invalid credentials' }), 401

@app.route('/api/analyze-resume', methods=['POST','GET'])
def analyze_resume():
    print("Hello")
    if 'resume' not in request.files:
        return jsonify({'error': 'No resume file provided'}), 400

    resume_file = request.files['resume']
    print(resume_file)
    # resume_file = 'RAAHIM.pdf'

    resume_path = 'backend/resume.pdf'
    resume_file.save(resume_path)
    # print(resume_path)

    # Extract text from the resume
    resume_text = extract_text_from_pdf(resume_path)

    # Only process if the action is 'improve'
    prompt = f"I have the following resume, please suggest me some ideas to improve my skills:\n{resume_text}\nBased on this resume, recommend me 5 improvements.\nJust Output me the improvements Nothing Else"
    

    # Send request to Hugging Face model
    response_text = ""
    for message in client.chat_completion(
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500,
        stream=True,
    ):
        response_text += message.choices[0].delta.content

    print('------------DONE------------')

    # Return the response from Hugging Face
    return jsonify({'result': response_text})

@app.route('/adminpage', methods=['POST'])
def admin_page():
    data = request.json
    company_name = data.get('companyName')
    job_title = data.get('jobTitle')
    job_description = data.get('jobDescription')
    salary = data.get('salary')
    company_logo_url = data.get('companyLogoUrl')

    # Insert new job into MongoDB
    jobs_collection.insert_one({
        "companyName": company_name,
        "jobTitle": job_title,
        "jobDescription": job_description,
        "salary": salary,
        "companyLogoUrl": company_logo_url
    })
    return jsonify({'message': 'Job posted successfully'}), 201


if __name__ == '__main__':
    app.run(debug=True, port=5000)
