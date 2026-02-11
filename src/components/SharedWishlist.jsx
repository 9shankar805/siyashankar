import { useState } from 'react'
import { useFirebaseItems } from '../hooks/useFirebase'

const SharedWishlist = () => {
  const { items: wishes, loading, addItem, removeItem } = useFirebaseItems('wishlist')
  const [newWish, setNewWish] = useState({ item: '', link: '', priority: 'medium' })
  const [showAdd, setShowAdd] = useState(false)

  const userName = localStorage.getItem('userName') || 'Husband Shankar'

  const addWish = async () => {
    if (newWish.item.trim()) {
      await addItem({ ...newWish, addedBy: userName })
      setNewWish({ item: '', link: '', priority: 'medium' })
      setShowAdd(false)
    }
  }

  if (loading) return <div className="wishlist"><p>Loading...</p></div>

  return (
    <div className="wishlist">
      <h2>🎁 Shared Wishlist</h2>
      <button onClick={() => setShowAdd(true)}>+ Add Wish</button>

      <div className="wishes-grid">
        {wishes.map(wish => (
          <div key={wish.id} className={`wish-card priority-${wish.priority}`}>
            <h3>{wish.item}</h3>
            {wish.link && <a href={wish.link} target="_blank" rel="noopener noreferrer">🔗 View</a>}
            <p className="added-by">Added by: {wish.addedBy}</p>
            <button onClick={() => removeItem(wish.id)}>×</button>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add to Wishlist</h3>
            <input
              placeholder="Item name..."
              value={newWish.item}
              onChange={(e) => setNewWish({ ...newWish, item: e.target.value })}
            />
            <input
              placeholder="Link (optional)..."
              value={newWish.link}
              onChange={(e) => setNewWish({ ...newWish, link: e.target.value })}
            />
            <select value={newWish.priority} onChange={(e) => setNewWish({ ...newWish, priority: e.target.value })}>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <div className="modal-actions">
              <button onClick={addWish}>Add</button>
              <button onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SharedWishlist
