import { useState, useEffect } from 'react'
import { saveAlbum, getAlbums } from '../firebaseService'

const Albums = () => {
  const [albums, setAlbums] = useState({
    sikha: [],
    shankar: [],
    shared: []
  })
  const [loading, setLoading] = useState(true)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [fullImage, setFullImage] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newMemory, setNewMemory] = useState({ title: '', image: '', link: '' })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadAlbums()
  }, [])

  const loadAlbums = async () => {
    const data = await getAlbums()
    if (data) {
      setAlbums(data)
    }
    setLoading(false)
  }

  const saveAlbums = async (updated) => {
    setAlbums(updated)
    await saveAlbum(updated)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'mylife')
      
      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dsk1h5pcz/image/upload', {
          method: 'POST',
          body: formData
        })
        const data = await response.json()
        if (data.secure_url) {
          setNewMemory({ ...newMemory, image: data.secure_url })
        } else {
          throw new Error('Upload failed')
        }
      } catch (error) {
        console.error('Cloudinary upload failed, using base64:', error)
        const reader = new FileReader()
        reader.onloadend = () => {
          setNewMemory({ ...newMemory, image: reader.result })
        }
        reader.readAsDataURL(file)
      } finally {
        setUploading(false)
      }
    }
  }

  const addMemory = async () => {
    if (newMemory.title && (newMemory.image || newMemory.link)) {
      const memory = { ...newMemory, id: Date.now(), date: new Date().toISOString() }
      const updated = { ...albums, [selectedAlbum]: [...albums[selectedAlbum], memory] }
      await saveAlbums(updated)
      setNewMemory({ title: '', image: '', link: '' })
      setShowUpload(false)
      
      // Send notification
      const userName = localStorage.getItem('userName') || 'Husband Shankar'
      const { notifyNewMemory } = await import('../utils/notifications')
      notifyNewMemory(userName.split(' ')[1], newMemory.title)
    }
  }

  const deleteMemory = async (id) => {
    const memory = albums[selectedAlbum].find(m => m.id === id)
    
    // Delete from Cloudinary if it's a Cloudinary image
    if (memory && memory.image && memory.image.includes('cloudinary.com')) {
      try {
        const publicId = memory.image.split('/').pop().split('.')[0]
        await fetch(`https://api.cloudinary.com/v1_1/dsk1h5pcz/image/destroy`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id: publicId })
        })
      } catch (error) {
        console.error('Failed to delete from Cloudinary:', error)
      }
    }
    
    const updated = { ...albums, [selectedAlbum]: albums[selectedAlbum].filter(m => m.id !== id) }
    await saveAlbums(updated)
  }

  const downloadImage = () => {
    const link = document.createElement('a')
    link.href = fullImage.image
    link.download = fullImage.title || 'image'
    link.click()
  }

  const filteredMemories = selectedAlbum ? albums[selectedAlbum].filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : []

  const albumList = [
    { id: 'sikha', icon: '👩', name: "Sikha's Memories", count: albums.sikha.length },
    { id: 'shankar', icon: '👨', name: "Shankar's Memories", count: albums.shankar.length },
    { id: 'shared', icon: '💑', name: "Our Shared Memories", count: albums.shared.length }
  ]

  if (loading) {
    return <div className="album-list"><p>Loading albums...</p></div>
  }

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
      
      <input 
        type="text" 
        placeholder="🔍 Search memories..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      
      <div className="memory-grid">
        <div className="memory-card add-memory" onClick={() => setShowUpload(true)}>
          <div className="add-icon">+</div>
          <p className="add-text">Add Memory</p>
        </div>
        {filteredMemories.map(memory => (
          <div key={memory.id} className="memory-card has-image" onClick={() => memory.image && setFullImage(memory)}>
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
              <button className="delete-memory" onClick={(e) => { e.stopPropagation(); deleteMemory(memory.id); }}>×</button>
            </div>
          </div>
        ))}
      </div>

      {fullImage && (
        <div className="upload-modal-overlay" onClick={() => setFullImage(null)}>
          <div className="full-image-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-full-image" onClick={() => setFullImage(null)}>×</button>
            <button className="download-image" onClick={downloadImage}>💾</button>
            <img src={fullImage.image} alt={fullImage.title} className="full-image" />
            <div className="full-image-caption">{fullImage.title}</div>
          </div>
        </div>
      )}

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
              disabled={uploading}
            />
            {uploading && <p>Uploading to cloud...</p>}
            <input
              type="url"
              placeholder="Google Drive / External Link (optional)..."
              value={newMemory.link}
              onChange={(e) => setNewMemory({ ...newMemory, link: e.target.value })}
            />
            {newMemory.image && <img src={newMemory.image} alt="Preview" className="upload-preview" />}
            <div className="upload-actions">
              <button onClick={addMemory} disabled={uploading}>Add</button>
              <button onClick={() => setShowUpload(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Albums
