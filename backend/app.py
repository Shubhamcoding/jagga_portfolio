from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication


@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Web Portfolio API"})


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not all([name, email, message]):
        return jsonify({"error": "All fields are required"}), 400

    # TODO: Add email sending or database storage logic here
    return jsonify({"message": "Message received successfully!"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
