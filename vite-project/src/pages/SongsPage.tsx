import { useState } from 'react';
import { LinkedList } from '../structures/LinkedList';
import type { Song } from '../structures/LinkedList';
import './SongsPage.css';

const mockSongs: Song[] = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
  { id: 2, title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02' },
  { id: 3, title: 'Imagine', artist: 'John Lennon', duration: '3:03' },
  { id: 4, title: 'Hotel California', artist: 'Eagles', duration: '6:30' },
  { id: 5, title: 'Sweet Child o\' Mine', artist: 'Guns N\' Roses', duration: '5:56' },
];

export function SongsPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [songsList] = useState<LinkedList<Song>>(() => {
    const list = new LinkedList<Song>();
    mockSongs.forEach(song => list.append(song));
    return list;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [songs] = useState<Song[]>(songsList.getAll());

  const currentSong = songs[currentIndex] || null;

  const nextSong = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="songs-page">
      <div className="header">
        <h1>🎵 Music Player</h1>
        <button className="nav-btn" onClick={() => onNavigate('browser')}>
          Go to Browser History
        </button>
      </div>

      <div className="player-container">
        {currentSong ? (
          <div className="now-playing">
            <div className="song-info">
              <h2>{currentSong.title}</h2>
              <p className="artist">{currentSong.artist}</p>
              <p className="duration">Duration: {currentSong.duration}</p>
              <p className="position">
                Song {currentIndex + 1} of {songs.length}
              </p>
            </div>

            <div className="controls">
              <button
                onClick={prevSong}
                disabled={currentIndex === 0}
                className="control-btn"
              >
                ⏮️ Previous
              </button>
              <button onClick={nextSong} disabled={currentIndex === songs.length - 1} className="control-btn">
                Next ⏭️
              </button>
            </div>
          </div>
        ) : (
          <p>No songs available</p>
        )}
      </div>

      <div className="playlist">
        <h3>Playlist ({songs.length} songs)</h3>
        <ul className="song-list">
          {songs.map((song, index) => (
            <li
              key={song.id}
              onClick={() => setCurrentIndex(index)}
              className={index === currentIndex ? 'active' : ''}
            >
              <span className="song-number">{index + 1}.</span>
              <span className="song-title">{song.title}</span>
              <span className="song-artist">{song.artist}</span>
              <span className="song-duration">{song.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
