import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for all routes

@app.route('/bfhl', methods=['POST'])
def process_data():
    data = request.json.get('data', [])
    numbers = [x for x in data if x.isdigit()]
    alphabets = [x for x in data if x.isalpha()]
    highest_alphabet = max(alphabets, key=str.lower) if alphabets else ""
    
    response = {
        "is_success": True,
        "user_id": "john_doe_17091999",
        "email": "john@xyz.com",
        "roll_number": "ABCD123",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": [highest_alphabet] if highest_alphabet else []
    }
    return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 4000))
    app.run(host='0.0.0.0', port=port, debug=True)