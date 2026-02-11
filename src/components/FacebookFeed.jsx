import { useState, useEffect, useRef } from 'react'
import { savePost, getPosts, updatePost, deletePost } from '../firebaseService'
import './FacebookFeed.css'

const FacebookFeed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({ text: '', images: [] })
  const [selectedPost, setSelectedPost] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [showMenu, setShowMenu] = useState(null)
  const [editingPost, setEditingPost] = useState(null)
  const [editText, setEditText] = useState('')
  const fileInputRef = useRef(null)
  
  const currentUser = localStorage.getItem('userName') || 'Husband Shankar'
  const userAvatar = currentUser === 'Husband Shankar' ? '👨' : '👩'
  const userName = currentUser === 'Husband Shankar' ? 'Shankar' : 'Sikha'

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const loadedPosts = await getPosts(50)
    setPosts(loadedPosts)
    setLoading(false)
  }

  const handleCreatePost = async () => {
    if (newPost.text.trim() || newPost.images.length > 0) {
      const post = {
        author: userName,
        avatar: userAvatar,
        time: 'Just now',
        content: newPost.text,
        images: newPost.images,
        likes: 0,
        loves: 0,
        comments: []
      }
      await savePost(post)
      setNewPost({ text: '', images: [] })
      setShowCreatePost(false)
      loadPosts()
      
      // Send notification
      const { notifyNewPost } = await import('../utils/notifications')
      notifyNewPost(userName, newPost.text.substring(0, 50) || 'Posted a photo')
    }
  }

  const handleReaction = async (postId, type) => {
    const post = posts.find(p => p.id === postId)
    if (post) {
      const updatedPost = { ...post, [type]: post[type] + 1 }
      await updatePost(postId, updatedPost)
      loadPosts()
    }
  }

  const handleAddComment = async (postId) => {
    if (commentText.trim()) {
      const post = posts.find(p => p.id === postId)
      if (post) {
        const updatedComments = [
          ...post.comments,
          {
            id: Date.now(),
            author: userName,
            text: commentText,
            time: 'Just now'
          }
        ]
        await updatePost(postId, { ...post, comments: updatedComments })
        setCommentText('')
        loadPosts()
      }
    }
  }

  const handleDeletePost = async (postId) => {
    if (window.confirm('Delete this post?')) {
      const post = posts.find(p => p.id === postId)
      
      // Delete images from Cloudinary
      if (post && post.images && post.images.length > 0) {
        for (const imageUrl of post.images) {
          if (imageUrl.includes('cloudinary.com')) {
            try {
              const publicId = imageUrl.split('/').pop().split('.')[0]
              await fetch(`https://api.cloudinary.com/v1_1/dsk1h5pcz/image/destroy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ public_id: publicId })
              })
            } catch (error) {
              console.error('Failed to delete from Cloudinary:', error)
            }
          }
        }
      }
      
      await deletePost(postId)
      setShowMenu(null)
      loadPosts()
    }
  }

  const handleEditPost = (post) => {
    setEditingPost(post.id)
    setEditText(post.content)
    setShowMenu(null)
  }

  const handleSaveEdit = async (postId) => {
    const post = posts.find(p => p.id === postId)
    if (post && editText.trim()) {
      await updatePost(postId, { ...post, content: editText })
      setEditingPost(null)
      setEditText('')
      loadPosts()
    }
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      for (const file of files) {
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
            setNewPost(prev => ({
              ...prev,
              images: [...prev.images, data.secure_url]
            }))
          } else {
            throw new Error('Upload failed')
          }
        } catch (error) {
          console.error('Cloudinary upload failed, using base64:', error)
          const reader = new FileReader()
          reader.onloadend = () => {
            setNewPost(prev => ({
              ...prev,
              images: [...prev.images, reader.result]
            }))
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  const removeImage = (index) => {
    setNewPost(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const renderImageGrid = (images) => {
    if (!images || images.length === 0) return null;
    
    const count = images.length;
    let gridClass = 'grid-1';
    if (count === 2) gridClass = 'grid-2';
    if (count === 3) gridClass = 'grid-3';
    if (count >= 4) gridClass = 'grid-4';

    return (
      <div className={`post-image-grid ${gridClass}`}>
        {images.slice(0, 4).map((img, idx) => (
          <div key={idx} className="grid-image-item">
            <img src={img} alt={`Post ${idx + 1}`} />
            {count > 4 && idx === 3 && (
              <div className="more-images-overlay">
                +{count - 4}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="facebook-feed">
        <div className="loading-state">Loading posts...</div>
      </div>
    )
  }

  return (
    <div className="facebook-feed">
      {/* Create Post Section */}
      <div className="create-post-section">
        <div className="create-post-input" onClick={() => setShowCreatePost(true)}>
          <div className="user-avatar">{userAvatar}</div>
          <div className="post-placeholder">What's on your mind, {userName}?</div>
        </div>
        <div className="post-options">
          <button className="post-option" onClick={() => {
            setShowCreatePost(true)
            setTimeout(() => fileInputRef.current?.click(), 100)
          }}>
            <span className="option-icon">📷</span>
            <span>Photo/Video</span>
          </button>
          <button className="post-option">
            <span className="option-icon">❤️</span>
            <span>Feeling/Activity</span>
          </button>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="post-modal-overlay" onClick={() => setShowCreatePost(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Post</h3>
              <button className="close-btn" onClick={() => setShowCreatePost(false)}>
                <div className="close-icon">×</div>
              </button>
            </div>
            <div className="modal-content">
              <div className="post-author">
                <div className="author-avatar">{userAvatar}</div>
                <div className="author-info">
                  <div className="author-name">{userName}</div>
                  <div className="post-privacy">
                    <span className="privacy-icon">🌐</span> Public
                  </div>
                </div>
              </div>
              <textarea
                className="post-textarea"
                placeholder={`What's on your mind, ${userName}?`}
                value={newPost.text}
                onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
              />
              
              {newPost.images.length > 0 && (
                <div className="post-images-preview">
                  {newPost.images.map((img, idx) => (
                    <div key={idx} className="preview-image-container">
                      <img src={img} alt={`Preview ${idx}`} />
                      <button 
                        className="remove-image"
                        onClick={() => removeImage(idx)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="add-to-post-box">
                <span className="add-text">Add to your post</span>
                <div className="add-options">
                  <div className="add-option photo" onClick={() => fileInputRef.current?.click()}>
                    📷
                  </div>
                  <div className="add-option tag">🏷️</div>
                  <div className="add-option feeling">😊</div>
                  <div className="add-option location">📍</div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className={`post-submit-btn ${!newPost.text.trim() && newPost.images.length === 0 ? 'disabled' : ''}`}
                onClick={handleCreatePost}
                disabled={!newPost.text.trim() && newPost.images.length === 0}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {/* Posts Feed */}
      <div className="posts-feed">
        {posts.length === 0 ? (
          <div className="empty-posts">
            <p>No posts yet. Create your first memory! 💕</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-author-info">
                  <div className="author-avatar">{post.avatar}</div>
                  <div className="author-details">
                    <div className="author-name">{post.author}</div>
                    <div className="post-meta">
                      <span className="post-time">{post.time}</span>
                      <span className="post-dot">·</span>
                      <span className="post-privacy">🌐</span>
                    </div>
                  </div>
                </div>
                <div className="post-menu-wrapper">
                  <button className="post-menu" onClick={() => setShowMenu(showMenu === post.id ? null : post.id)}>⋯</button>
                  {showMenu === post.id && (
                    <div className="post-menu-dropdown">
                      <button className="menu-item edit" onClick={() => handleEditPost(post)}>
                        <span>✏️</span> Edit Post
                      </button>
                      <button className="menu-item delete" onClick={() => handleDeletePost(post.id)}>
                        <span>🗑️</span> Delete Post
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="post-content">
                {editingPost === post.id ? (
                  <div className="edit-post-box">
                    <textarea
                      className="edit-textarea"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button className="save-edit-btn" onClick={() => handleSaveEdit(post.id)}>Save</button>
                      <button className="cancel-edit-btn" onClick={() => { setEditingPost(null); setEditText(''); }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {post.content && <p className="post-text">{post.content}</p>}
                    {post.images && post.images.length > 0 && renderImageGrid(post.images)}
                  </>
                )}
              </div>

              <div className="post-stats-bar">
                <div className="reactions-count">
                  {(post.likes > 0 || post.loves > 0) && (
                    <>
                      <div className="reaction-icons">
                        {post.likes > 0 && <span className="reaction-icon like">👍</span>}
                        {post.loves > 0 && <span className="reaction-icon love">❤️</span>}
                      </div>
                      <span className="count-text">{post.likes + post.loves}</span>
                    </>
                  )}
                </div>
                <div className="comments-share-count">
                  {post.comments.length > 0 && (
                    <span>{post.comments.length} comments</span>
                  )}
                </div>
              </div>

              <div className="post-actions-bar">
                <button 
                  className="action-btn like-btn"
                  onClick={() => handleReaction(post.id, 'likes')}
                >
                  <svg className="action-icon-svg" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V3a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z"/>
                  </svg>
                  <span>Like</span>
                </button>
                <button 
                  className="action-btn comment-btn"
                  onClick={() => setSelectedPost(post.id === selectedPost ? null : post.id)}
                >
                  <svg className="action-icon-svg" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M12 2C6.477 2 2 6.145 2 11.25c0 2.407 1.03 4.616 2.75 6.25v4.5l4.5-2.5c1.167.333 2.417.5 3.75.5 5.523 0 10-4.145 10-9.25S17.523 2 12 2zm1 13h-2v-2h2v2zm0-3h-2V7h2v5z"/>
                  </svg>
                  <span>Comment</span>
                </button>
                <button className="action-btn share-btn">
                  <svg className="action-icon-svg" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M13.5 3.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V10h5.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H16.5v6.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V13H7.5c-.83 0-1.5-.67-1.5-1.5S6.67 10 7.5 10h6V3.5z"/>
                  </svg>
                  <span>Share</span>
                </button>
              </div>

              {/* Comments Section */}
              {selectedPost === post.id && (
                <div className="comments-section">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="comment">
                      <div className="comment-avatar">{comment.author === 'Shankar' ? '👨' : '👩'}</div>
                      <div className="comment-bubble">
                        <div className="comment-author">{comment.author}</div>
                        <div className="comment-text">{comment.text}</div>
                      </div>
                    </div>
                  ))}
                  <div className="add-comment-box">
                    <div className="comment-avatar">{userAvatar}</div>
                    <div className="comment-input-wrapper">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      />
                      <button 
                        className="comment-send-btn"
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentText.trim()}
                      >
                        ➤
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default FacebookFeed
