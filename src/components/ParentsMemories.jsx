import { useState, useEffect } from 'react'

const ParentsMemories = () => {
  const [memories, setMemories] = useState({
    sikhaParents: [
      { id: 1, title: 'Family Gathering', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400', link: '', date: '2023-05-10' },
      { id: 2, title: 'Mom & Dad Anniversary', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', link: '', date: '2023-06-20' }
    ],
    shankarParents: [
      { id: 3, title: 'Parents Visit', image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400', link: '', date: '2023-07-15' },
      { id: 4, title: 'Family Photos Album', image: '', link: 'https://drive.google.com/drive/folders/parents', date: '2023-08-01' }
    ]
  })
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [newMemory, setNewMemory] = useState({ title: '', image: '', link: '' })

  useEffect(() => {
    const saved = localStorage.getItem('parentsMemories')
    if (saved) setMemories(JSON.parse(saved))
  }, [])

  const saveMemories = (updated) => {
    setMemories(updated)
    localStorage.setItem('parentsMemories', JSON.stringify(updated))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewMemory({ ...newMemory, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const addMemory = () => {
    if (newMemory.title && (newMemory.image || newMemory.link)) {
      const memory = { ...newMemory, id: Date.now(), date: new Date().toISOString() }
      const updated = { ...memories, [selectedAlbum]: [...memories[selectedAlbum], memory] }
      saveMemories(updated)
      setNewMemory({ title: '', image: '', link: '' })
      setShowUpload(false)
    }
  }

  const deleteMemory = (id) => {
    const updated = { ...memories, [selectedAlbum]: memories[selectedAlbum].filter(m => m.id !== id) }
    saveMemories(updated)
  }

  const albumList = [
    { id: 'sikhaParents', icon: '👨👩👧', name: "Sikha's Parents", count: memories.sikhaParents.length },
    { id: 'shankarParents', icon: '👨👩👦', name: "Shankar's Parents", count: memories.shankarParents.length }
  ]

  if (!selectedAlbum) {
    return (
      <div className="album-list">
        {albumList.map(album => (
          <div key={album.id} className="album-card" onClick={() => setSelectedAlbum(album.id)}>
            <div className="album-icon">{album.icon}</div>
            <div className="album-info">
              <div className="album-name">{album.name}</div>
              <div className="album-count">{album.count} memories</div>
            </div>
            <div className="album-arrow">→</div>
          </div>
        ))}
      </div>
    )
  }

  const currentAlbum = albumList.find(a => a.id === selectedAlbum)

  return (
    <div className="memories-content">
      <div className="album-header">
        <button className="back-btn" onClick={() => setSelectedAlbum(null)}>← Back</button>
        <h3>{currentAlbum.name}</h3>
      </div>
      
      <div className="memory-grid">
        <div className="memory-card add-memory" onClick={() => setShowUpload(true)}>
          <div className="add-icon">+</div>
          <p className="add-text">Add Memory</p>
        </div>
        {memories[selectedAlbum].map(memory => (
          <div key={memory.id} className="memory-card has-image">
            {memory.image ? (
              <img src={memory.image} alt={memory.title} className="memory-image" />
            ) : (
              <div className="memory-link-card">
                <span className="link-icon">🔗</span>
                <span className="link-text">{memory.title}</span>
              </div>
            )}
            <div className="memory-overlay">
              <div className="memory-caption">{memory.title}</div>
              {memory.link && (
                <a href={memory.link} target="_blank" rel="noopener noreferrer" className="memory-link">
                  View Link 🔗
                </a>
              )}
              <button className="delete-memory" onClick={() => deleteMemory(memory.id)}>×</button>
            </div>
          </div>
        ))}
      </div>

      {showUpload && (
        <div className="upload-modal-overlay" onClick={() => setShowUpload(false)}>
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Memory</h3>
            <input
              type="text"
              placeholder="Title..."
              value={newMemory.title}
              onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <input
              type="url"
              placeholder="Google Drive / External Link (optional)..."
              value={newMemory.link}
              onChange={(e) => setNewMemory({ ...newMemory, link: e.target.value })}
            />
            {newMemory.image && <img src={newMemory.image} alt="Preview" className="upload-preview" />}
            <div className="upload-actions">
              <button onClick={addMemory}>Add</button>
              <button onClick={() => setShowUpload(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ParentsMemories
