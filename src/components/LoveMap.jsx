import { useState } from 'react'

const LoveMap = () => {
  const [places, setPlaces] = useState([
    { id: 1, name: 'Our First Date', lat: 0, lng: 0, description: 'Where it all started', date: '2018-01-27' },
    { id: 2, name: 'First Trip', lat: 0, lng: 0, description: 'Remember the beach?', date: '2019-06-15' }
  ])
  const [newPlace, setNewPlace] = useState({ name: '', description: '', date: '' })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddPlace = (e) => {
    e.preventDefault()
    if (!newPlace.name) return
    setPlaces([...places, { ...newPlace, id: Date.now() }])
    setNewPlace({ name: '', description: '', date: '' })
    setShowAddForm(false)
  }

  return (
    <div className="love-map-container">
      <h2 className="map-title">🗺️ Our Love Map</h2>
      <p className="map-subtitle">Places we've conquered together</p>

      <div className="places-list">
        {places.map(place => (
          <div key={place.id} className="place-card">
            <div className="place-icon">📍</div>
            <div className="place-info">
              <h3>{place.name}</h3>
              <p className="place-date">{place.date}</p>
              <p className="place-desc">{place.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="add-place-btn" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel' : 'Add New Place'}
      </button>

      {showAddForm && (
        <form className="add-place-form" onSubmit={handleAddPlace}>
          <input
            type="text"
            placeholder="Location Name"
            value={newPlace.name}
            onChange={e => setNewPlace({ ...newPlace, name: e.target.value })}
            required
          />
          <input
            type="date"
            value={newPlace.date}
            onChange={e => setNewPlace({ ...newPlace, date: e.target.value })}
          />
          <textarea
            placeholder="Memory description..."
            value={newPlace.description}
            onChange={e => setNewPlace({ ...newPlace, description: e.target.value })}
          />
          <button type="submit">Save Location</button>
        </form>
      )}

      <style jsx>{`
        .love-map-container {
          padding: 20px;
          text-align: center;
          color: white;
        }
        .map-title {
          font-family: 'Courier New', monospace;
          color: var(--theme-primary);
          margin-bottom: 5px;
        }
        .map-subtitle {
          font-size: 14px;
          margin-bottom: 30px;
          opacity: 0.8;
        }
        .places-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .place-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 15px;
          text-align: left;
          transition: transform 0.3s;
        }
        .place-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }
        .place-icon {
          font-size: 24px;
        }
        .place-info h3 {
          margin: 0 0 5px 0;
          font-size: 18px;
        }
        .place-date {
          font-size: 12px;
          color: #ccc;
          margin-bottom: 8px;
        }
        .place-desc {
          font-size: 14px;
          line-height: 1.4;
        }
        .add-place-btn {
          background: var(--theme-primary);
          border: none;
          color: white;
          padding: 12px 30px;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .add-place-btn:hover {
          transform: scale(1.05);
        }
        .add-place-form {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
          background: rgba(0, 0, 0, 0.5);
          padding: 20px;
          border-radius: 15px;
        }
        .add-place-form input, .add-place-form textarea {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 10px;
          border-radius: 8px;
          color: white;
          outline: none;
        }
        .add-place-form button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default LoveMap
