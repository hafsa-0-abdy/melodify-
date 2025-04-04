from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Database URI and configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hafsa:melodifypass@localhost/melodify'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database connection
db = SQLAlchemy(app)

# Import views here to avoid circular imports
import views

# Create all tables before starting the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure the database tables are created
    app.run(debug=True)
