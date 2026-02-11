import { useState, useRef } from 'react'

const VoiceMessages = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState([])
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const timerRef = useRef(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks = []

      recorder.ondataavailable = (e) => chunks.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
        const audioUrl = window.URL.createObjectURL(blob)
        const newRecording = {
          id: Date.now(),
          url: audioUrl,
          date: new Date().toLocaleString(),
          duration: recordingTime
        }
        setRecordings(prev => [newRecording, ...prev])
        setRecordingTime(0)
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)

    } catch (err) {
      console.error('Error accessing microphone:', err)
      alert('Could not access microphone. Please allow permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop()
      setIsRecording(false)
      clearInterval(timerRef.current)
      mediaRecorder.stream.getTracks().forEach(track => track.stop())
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="voice-messages-container">
      <h2 className="voice-title">🎙️ Voice Notes for My Love</h2>
      
      <div className="recorder-interface">
        <div className={`mic-button ${isRecording ? 'recording' : ''}`} 
             onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? '⏹️' : '🎙️'}
        </div>
        <div className="recording-status">
          {isRecording ? `Recording... ${formatTime(recordingTime)}` : 'Tap to Record'}
        </div>
      </div>

      <div className="recordings-list">
        {recordings.length === 0 ? (
          <p className="no-recordings">No voice messages yet. Leave a sweet note! 🎵</p>
        ) : (
          recordings.map(rec => (
            <div key={rec.id} className="recording-item">
              <div className="rec-info">
                <span className="rec-date">{rec.date}</span>
              </div>
              <audio controls src={rec.url} className="audio-player" />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default VoiceMessages
