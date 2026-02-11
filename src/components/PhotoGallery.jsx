import { useState } from 'react'

const photos = [
  { src: "/pic/life.png", text: "HELLO SIYA" },
  { src: "/pic/world.png", text: "" },
  { src: "/pic/pic1.png", text: "当时我也有在比心哦~(｡･ω･｡)ﾉ♡" },
  { src: "/pic/pic2.png", text: "第一次去重庆见女票, 小仙女出现啦" },
  { src: "/pic/pic3.png", text: "江边，今夜月色真美" },
  { src: "/pic/pic4.png", text: "牵爪爪散步，开心~o(≧v≦)o" },
  { src: "/pic/pic5.png", text: "咳咳，老大不小了还写情书，真是让人害羞(/ω＼)" },
  { src: "/pic/pic6.png", text: "超级喜欢女票送的兔兔和胡萝卜!!!" }
]

const PhotoGallery = ({ show, onToggle }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!show) {
    return (
      <div className="heart-button-container">
        <span className="click-me">Click!</span>
        <button className="heart-button" onClick={() => onToggle(true)} />
      </div>
    )
  }

  return (
    <div className="photo-gallery">
      <span className="photo-text">{photos[currentIndex].text}</span>
      <img src={photos[currentIndex].src} alt="Memory" className="photo-img" />
    </div>
  )
}

export default PhotoGallery
