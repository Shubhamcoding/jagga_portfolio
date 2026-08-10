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
FORMSPREE_FORM_ID = os.getenv("FORMSPREE_FORM_ID")

JSONBIN_BASE_URL = "https://api.jsonbin.io/v3"
FORMSPREE_BASE_URL = "https://formspree.io/f"


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


# ══════════════════════════════════════════════════════════════════════
#  Formspree  –  Contact Form Submission
# ══════════════════════════════════════════════════════════════════════

@app.route("/api/contact", methods=["POST"])
def contact():
    """Forward contact-form data to Formspree."""
    if not FORMSPREE_FORM_ID:
        return jsonify({"error": "Formspree Form ID not configured"}), 500

    data = request.get_json()

    # Validate required fields
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not all([name, email, message]):
        return jsonify({"error": "All fields (name, email, message) are required"}), 400

    # Build payload for Formspree
    payload = {
        "name": name,
        "email": email,
        "message": message,
    }

    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    try:
        response = requests.post(
            f"{FORMSPREE_BASE_URL}/{FORMSPREE_FORM_ID}",
            json=payload,
            headers=headers,
            timeout=10,
        )
        response.raise_for_status()
        return jsonify({"message": "Message sent successfully!"}), 200

    except requests.exceptions.HTTPError as http_err:
        return jsonify({
            "error": "Formspree rejected the submission",
            "details": str(http_err),
        }), response.status_code

    except requests.exceptions.RequestException as req_err:
        return jsonify({
            "error": "Could not reach Formspree",
            "details": str(req_err),
        }), 503


if __name__ == "__main__":
    app.run(debug=True, port=5000)
