from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# App setup
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend

# PostgreSQL DB config
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hafsa:melodifypass@localhost/melodify'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# DB model
class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(200))
    audio = db.Column(db.String(200))
    mood = db.Column(db.String(50))  # NEW: Mood tag (e.g., Chill, Hype)

    # Comment model
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('song.id'), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    text = db.Column(db.Text, nullable=False)

    song = db.relationship('Song', backref=db.backref('comments', lazy=True))

# GET comments for a song
@app.route('/songs/<int:song_id>/comments', methods=['GET'])
def get_comments(song_id):
    comments = Comment.query.filter_by(song_id=song_id).all()
    return jsonify([
        {'id': c.id, 'username': c.username, 'text': c.text}
        for c in comments
    ])

# POST a new comment
@app.route('/songs/<int:song_id>/comments', methods=['POST'])
def add_comment(song_id):
    data = request.get_json()
    new_comment = Comment(
        song_id=song_id,
        username=data.get('username', 'Anonymous'),
        text=data['text']
    )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({ "message": "Comment added ✅" }), 201


# Test route
@app.route('/')
def index():
    return jsonify({ "message": "Melodify API is live 🎧" })

# GET all songs
@app.route('/songs', methods=['GET'])
def get_songs():
    songs = Song.query.all()
    return jsonify([
        {
            'id': song.id,
            'title': song.title,
            'artist': song.artist,
            'image': song.image,
            'audio': song.audio,
            'mood': song.mood  # Include mood in response
        } for song in songs
    ])

# POST new song
@app.route('/songs', methods=['POST'])
def add_song():
    data = request.get_json()

    new_song = Song(
        title=data['title'],
        artist=data['artist'],
        image=data.get('image'),
        audio=data.get('audio'),
        mood=data.get('mood')  # Accept mood input
    )
    db.session.add(new_song)
    db.session.commit()

    return jsonify({ "message": "Song added successfully 🎶" }), 201

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
