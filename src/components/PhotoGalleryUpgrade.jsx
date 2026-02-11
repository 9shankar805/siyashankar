import { useState } from 'react'

const photoCategories = {
  adventures: [
    { src: "/pic/pic2.png", text: "第一次去重庆见女票, 小仙女出现啦", date: "2018-02" },
    { src: "/pic/pic3.png", text: "江边，今夜月色真美", date: "2018-02" },
    { src: "/pic/pic4.png", text: "牵爪爪散步，开心~o(≧v≦)o", date: "2018-03" }
  ],
  romantic: [
    { src: "/pic/life.png", text: "HELLO SIYA", date: "2018-01", hearts: 0 },
    { src: "/pic/world.png", text: "", date: "2018-01", hearts: 0 },
    { src: "/pic/pic5.png", text: "咳咳，老大不小了还写情书，真是让人害羞(/ω＼)", date: "2018-03", hearts: 0 }
  ],
  silly: [
    { src: "/pic/pic1.png", text: "当时我也有在比心哦~(｡･ω･｡)ﾉ♡", date: "2018-01", hearts: 0 },
    { src: "/pic/pic6.png", text: "超级喜欢女票送的兔兔和胡萝卜!!!", date: "2018-04", hearts: 0 }
  ]
}

const PhotoGalleryUpgrade = () => {
  const [category, setCategory] = useState('adventures')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [hearts, setHearts] = useState({})

  const photos = photoCategories[category]
  const currentPhoto = photos[currentIndex]

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
    setIsZoomed(false)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    setIsZoomed(false)
  }

  const addHeart = () => {
    const key = `${category}-${currentIndex}`
    setHearts(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }))
  }

  const handleSwipe = (e) => {
    const touch = e.changedTouches[0]
    if (touch.clientX < window.innerWidth / 2) {
      prevPhoto()
    } else {
      nextPhoto()
    }
  }

  return (
    <div className="photo-gallery-upgrade">
      <div className="gallery-categories">
        <button 
          className={category === 'adventures' ? 'active' : ''} 
          onClick={() => { setCategory('adventures'); setCurrentIndex(0); }}
        >
          🗺️ Adventures
        </button>
        <button 
          className={category === 'romantic' ? 'active' : ''} 
          onClick={() => { setCategory('romantic'); setCurrentIndex(0); }}
        >
          💕 Romantic
        </button>
        <button 
          className={category === 'silly' ? 'active' : ''} 
          onClick={() => { setCategory('silly'); setCurrentIndex(0); }}
        >
          😄 Silly
        </button>
      </div>

      <div className="gallery-viewer" onTouchEnd={handleSwipe}>
        <button className="nav-btn prev" onClick={prevPhoto}>‹</button>
        
        <div className="photo-container">
          <img 
            src={currentPhoto.src} 
            alt={currentPhoto.text}
            className={isZoomed ? 'zoomed' : ''}
            onClick={() => setIsZoomed(!isZoomed)}
          />
          <div className="photo-info">
            <p className="photo-caption">{currentPhoto.text}</p>
            <p className="photo-date">{currentPhoto.date}</p>
          </div>
          <button className="heart-btn" onClick={addHeart}>
            ❤️ {hearts[`${category}-${currentIndex}`] || 0}
          </button>
        </div>

        <button className="nav-btn next" onClick={nextPhoto}>›</button>
      </div>

      <div className="gallery-dots">
        {photos.map((_, idx) => (
          <span 
            key={idx} 
            className={idx === currentIndex ? 'dot active' : 'dot'}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  )
}

export default PhotoGalleryUpgrade
