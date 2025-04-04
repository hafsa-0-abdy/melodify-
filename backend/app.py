from flask import Flask
from flask_cors import CORS
from models import db

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hafsa:melodifypass@localhost/melodify'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

import views

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)