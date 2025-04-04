from flask import request, jsonify
from models import db, Song, Comment
from app import app

@app.route('/')
def index():
    return jsonify({"message": "Melodify API is live 🎷"})

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
            'mood': song.mood
        } for song in songs
    ])

@app.route('/songs', methods=['POST'])
def add_song():
    data = request.get_json()
    new_song = Song(
        title=data['title'],
        artist=data['artist'],
        image=data.get('image'),
        audio=data.get('audio'),
        mood=data.get('mood')
    )
    db.session.add(new_song)
    db.session.commit()
    return jsonify({"message": "Song added successfully 🎶"}), 201

@app.route('/songs/<int:song_id>/comments', methods=['GET'])
def get_comments(song_id):
    comments = Comment.query.filter_by(song_id=song_id).all()
    return jsonify([
        {'id': c.id, 'username': c.username, 'text': c.text} for c in comments
    ])

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