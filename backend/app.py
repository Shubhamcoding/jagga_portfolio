from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication



# ─── Root & Health ────────────────────────────────────────────────────
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Web Portfolio API"})


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})








if __name__ == "__main__":
    app.run(debug=True, port=5000)
