from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

@app.route('/')
def index():
    return jsonify({ "message": "Melodify API is live 🎧" })

if __name__ == '__main__':
    app.run(debug=True)
