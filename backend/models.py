from flask_sqlalchemy import SQLAlchemy

# Initialize db (to be used in app.py)
db = SQLAlchemy()

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(200))  # Real image URL here
    audio = db.Column(db.String(200))  # Real audio file URL here
    mood = db.Column(db.String(50))

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('song.id'), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    text = db.Column(db.Text, nullable=False)

    song = db.relationship('Song', backref=db.backref('comments', lazy=True))
