from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import re
from PyPDF2 import PdfReader
from dotenv import load_dotenv
import os 

load_dotenv()
# MongoDB setup
MONGO_URI = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(MONGO_URI)
db = client["Placement_Management_System"]
collection = db["jobs"]


def parse_resume(resume_file):
    """
    Parse the resume to extract skills, experience, and location.

    :param resume_file: The uploaded PDF resume file.
    :return: Dictionary with extracted details: 'skills', 'experience', and 'location'.
    """
    # Extract text from the resume PDF using PyPDF2
    try:
        reader = PdfReader(resume_file)
        resume_text = ""
        for page in reader.pages:
            resume_text += page.extract_text()
    except Exception as e:
        raise ValueError(f"Error reading the resume file: {e}")

    # Initialize result dictionary
    resume_details = {
        'skills': [],
        'experience': 0,
        'location': ''
    }

    # Extended list of predefined skills
    predefined_skills = [
        'python', 'java', 'machine learning', 'data analysis', 'project management',
        'sql', 'cloud computing', 'communication skills', 'teamwork', 'problem-solving',
        'c++', 'javaScript', 'html', 'css', 'deep learning', 'artificial intelligence',
        'data science', 'devops', 'aws', 'azure', 'docker', 'kubernetes', 'node.js', 'R-Language',
        'tensorflow', 'pytorch', 'sql', 'big data', 'biotechnology', 'digital marketing',
        'leadership', 'agile', 'scrum', 'git', 'linux', 'flutter', 'react', 'vue.js', 'tensorflow', 'firebase'
    ]
    found_skills = [skill for skill in predefined_skills if skill.lower() in resume_text.lower()]
    resume_details['skills'] = found_skills

    # Extract years of experience
    experience_match = re.search(r'(\d+)\s+years?\s+of\s+experience', resume_text.lower())
    if experience_match:
        resume_details['experience'] = int(experience_match.group(1))

    # Extract location (refined pattern to avoid irrelevant matches)
    location_match = re.search(
        r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:,\s+[A-Z]{2})?)\b', 
        resume_text
    )
    # Check against an extended predefined list of valid location names
    valid_locations = [
        "New York", "San Francisco", "Chicago", "Bangalore", "London", "Toronto",
        "Los Angeles", "Paris", "Berlin", "Sydney", "Tokyo", "Seattle", "Austin",
        "Vancouver", "Boston", "Dallas", "Mumbai", "Delhi", "Singapore", "Hong Kong", "Cape Town"
    ]
    if location_match and location_match.group(1) in valid_locations:
        resume_details['location'] = location_match.group(1)
    else:
        resume_details['location'] = "Unknown"  # Default location if no valid match found

    # Handle missing fields gracefully
    if not resume_details['skills']:
        resume_details['skills'] = ['N/A']  # Placeholder if no skills are found
    if not resume_details['experience']:
        resume_details['experience'] = 0  # Default experience to 0 if not mentioned

    return resume_details


# def parse_resume(resume_file):
#     """
#     Parse the resume to extract skills, experience, and location.
#     Output is formatted for CSV compatibility.

#     :param resume_file: The uploaded PDF resume file.
#     :return: CSV compatible string output.
#     """
#     # Extract text from the resume PDF using PyPDF2
#     try:
#         reader = PdfReader(resume_file)
#         resume_text = ""
#         for page in reader.pages:
#             resume_text += page.extract_text() or ""
#     except Exception as e:
#         raise ValueError(f"Error reading the resume file: {e}")

#     # Initialize result dictionary
#     resume_details = {
#         'is_fresher': False,
#         'education': [],
#         'skills': [],
#         'projects': [],
#         'certifications': [],
#         'experience': 0,
#         'promotion': 0,
#         'loyalty': 0
#     }

#     # Extended list of predefined skills
#     predefined_skills = [
#         'python', 'java', 'machine learning', 'data analysis', 'project management',
#         'sql', 'cloud computing', 'communication skills', 'teamwork', 'problem-solving',
#         'c++', 'javaScript', 'html', 'css', 'deep learning', 'artificial intelligence',
#         'data science', 'devops', 'aws', 'azure', 'docker', 'kubernetes', 'node.js', 'R-Language',
#         'tensorflow', 'pytorch', 'big data', 'biotechnology', 'digital marketing',
#         'leadership', 'agile', 'scrum', 'git', 'linux', 'flutter', 'react', 'vue.js', 'firebase'
#     ]

#     # Extracting skills
#     found_skills = [skill for skill in predefined_skills if skill.lower() in resume_text.lower()]
#     resume_details['skills'] = [{"skill": skill, "level": "N/A"} for skill in found_skills]  # Assume level is not specified

#     # Extract years of experience
#     experience_match = re.search(r'(\d+)\s+years?\s+of\s+experience', resume_text.lower())
#     if experience_match:
#         resume_details['experience'] = int(experience_match.group(1))

#     # Optionally, implement education, projects, certifications extraction here
#     # For simplicity, we will fill it with placeholders if not found
#     resume_details['education'] = ['N/A']  # Placeholder for the education data
#     resume_details['projects'] = ['N/A']  # Placeholder for projects
#     resume_details['certifications'] = ['N/A']  # Placeholder for certifications

#     # Prepare CSV output
#     output = StringIO()
#     csv_writer = csv.writer(output)
    
#     # Write header
#     csv_writer.writerow(resume_details.keys())
    
#     # Write data
#     csv_writer.writerow([
#         resume_details['is_fresher'],
#         str(resume_details['education']),
#         str(resume_details['skills']),
#         str(resume_details['projects']),
#         str(resume_details['certifications']),
#         resume_details['experience'],
#         resume_details['promotion'],
#         resume_details['loyalty']
#     ])

#     return output.getvalue().strip()

# Example Usage
# resume_data_csv = parse_resume('path_to_resume.pdf')
# print(resume_data_csv)


# def train_similarity_model():
#     """
#     Train a simple neural network model to combine weighted similarity scores.
#     Returns the trained model.
#     """
#     model = Sequential([
#         Dense(8, input_dim=3, activation='relu'),  # 3 inputs: skills, location, experience
#         Dense(4, activation='relu'),
#         Dense(1, activation='linear')  # Output a single score
#     ])
#     model.compile(optimizer='adam', loss='mean_squared_error')
    
#     # Example dummy training data for weights tuning
#     X_train = np.array([
#         [0.9, 1, 0.8],
#         [0.4, 0, 0.5],
#         [0.1, 1, 0.2],
#     ])
#     y_train = np.array([0.95, 0.35, 0.5])
    
#     model.fit(X_train, y_train, epochs=50, verbose=0)
#     return model

def recommend_jobs_from_resume(resume_file, top_n=5):
    """
    Recommend jobs based on a user's uploaded resume.
    
    :param resume_text: The uploaded resume in text format.
    :param top_n: Number of top recommendations to return.
    :return: List of recommended jobs with scores.
    """
    # Parse the resume text
    parsed_resume = parse_resume(resume_file)
    resume_skills = " ".join(parsed_resume['skills'])
    user_location = parsed_resume['location']
    user_experience = parsed_resume['experience']

    # Fetch all jobs
    jobs = list(collection.find())
    if not jobs:
        raise ValueError("No jobs available in the database.")

    # Extract job information
    job_skills = [" ".join(job['required_skills']) for job in jobs]
    job_locations = [job['location'] for job in jobs]
    job_experience = [
        int(job.get('required_experience', '0').split()[0]) for job in jobs
    ]


    # Skills Similarity (TF-IDF + Cosine Similarity)
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([resume_skills] + job_skills)
    skills_similarity = np.array(tfidf_matrix[0:1].dot(tfidf_matrix[1:].T).toarray()).flatten()
    print(skills_similarity)

    # # Location Similarity (Binary Match)
    # location_similarity = np.array([
    #     1 if user_location == job_location else 0 for job_location in job_locations
    # ])

    # # Experience Similarity (Normalized Difference)
    # max_experience = max(user_experience, max(job_experience, default=0))
    # experience_similarity = 1 - (np.abs(np.array(job_experience) - user_experience) / max_experience)

    # # Combine scores using the neural network model
    # similarity_model = train_similarity_model()
    # input_features = np.stack([skills_similarity, location_similarity, experience_similarity], axis=1)
    # scores = similarity_model.predict(input_features).flatten()

    # Rank Jobs by Score
    ranked_jobs = sorted(
        zip(jobs, skills_similarity),
        key=lambda x: x[1],
        reverse=True
    )

    # Return Top N Recommendations
    recommendations = [
        {
            "job_id": job["_id"],
            "title": job["title"],
            "score": round(score, 2)
        } for job, score in ranked_jobs[:top_n]
    ]

    return recommendations
