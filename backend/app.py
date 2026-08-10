import os
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# ─── Configuration ────────────────────────────────────────────────────
JSONBIN_API_KEY = os.getenv("JSONBIN_API_KEY")
JSONBIN_BIN_ID = os.getenv("JSONBIN_BIN_ID")

JSONBIN_BASE_URL = "https://api.jsonbin.io/v3"


# ─── Root & Health ────────────────────────────────────────────────────
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Web Portfolio API"})


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})


# ══════════════════════════════════════════════════════════════════════
#  JSONBin.io  –  Project Details
# ══════════════════════════════════════════════════════════════════════

@app.route("/api/projects", methods=["GET"])
def get_projects():
    """Retrieve project details from JSONBin.io."""
    if not JSONBIN_API_KEY or not JSONBIN_BIN_ID:
        return jsonify({"error": "JSONBin.io API key or Bin ID not configured"}), 500

    headers = {
        "X-Master-Key": JSONBIN_API_KEY,
        "X-Bin-Meta": "false",  # Return only the record data, no metadata
    }

    try:
        response = requests.get(
            f"{JSONBIN_BASE_URL}/b/{JSONBIN_BIN_ID}/latest",
            headers=headers,
            timeout=10,
        )
        response.raise_for_status()
        return jsonify(response.json()), 200

    except requests.exceptions.HTTPError as http_err:
        return jsonify({
            "error": "Failed to fetch projects from JSONBin.io",
            "details": str(http_err),
        }), response.status_code

    except requests.exceptions.RequestException as req_err:
        return jsonify({
            "error": "Could not reach JSONBin.io",
            "details": str(req_err),
        }), 503





if __name__ == "__main__":
    app.run(debug=True, port=5000)
