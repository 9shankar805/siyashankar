import { useState } from 'react'
import InstantMessage from './InstantMessage'
import QuickActions from './QuickActions'
import ConversationStarters from './ConversationStarters'

const MessagesView = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('instant')

  const tabs = [
    { id: 'instant', label: 'Chat', icon: '💬' },
    { id: 'quick', label: 'Quick', icon: '⚡' },
    { id: 'starters', label: 'Ideas', icon: '💭' }
  ]

  return (
    <div className="messages-view-modern">
      <div className="messages-header-modern">
        {onClose && (
          <button className="messages-back-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        )}
        <h2 className="messages-title">Messages</h2>
        <div className="messages-header-spacer"></div>
      </div>
      
      <div className="messages-tabs-modern">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`messages-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="messages-content-modern">
        {activeTab === 'instant' && <InstantMessage />}
        {activeTab === 'quick' && <QuickActions />}
        {activeTab === 'starters' && <ConversationStarters />}
      </div>
    </div>
  )
}

export default MessagesView
