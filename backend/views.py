from flask import request, jsonify
from app import app, db  # Import the app and db from app.py
from models import Song, Comment

# Route to get all songs
@app.route('/songs', methods=['GET'])
def get_songs():
    songs = Song.query.all()
    return jsonify([
        {
            'id': song.id,
            'title': song.title,
            'artist': song.artist,
            'image': song.image,  # Real image URL here
            'audio': song.audio,  # Real audio file URL here
            'mood': song.mood
        } for song in songs
    ])

# Route to add a new song
@app.route('/songs', methods=['POST'])
def add_song():
    data = request.get_json()
    new_song = Song(
        title=data['title'],
        artist=data['artist'],
        image=data.get('image'),  # Real image URL here
        audio=data.get('audio'),  # Real audio file URL here
        mood=data.get('mood')
    )
    db.session.add(new_song)
    db.session.commit()
    return jsonify({"message": "Song added successfully 🎶"}), 201

# Route to get comments for a specific song
@app.route('/songs/<int:song_id>/comments', methods=['GET'])
def get_comments(song_id):
    comments = Comment.query.filter_by(song_id=song_id).all()
    return jsonify([
        {'id': c.id, 'username': c.username, 'text': c.text} for c in comments
    ])

# Route to add a comment for a specific song
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
    return jsonify({"message": "Comment added ✅"}), 201
