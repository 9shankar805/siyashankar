import { saveMessage, getMessages } from './firebaseService'

// Test Firebase messaging
async function testMessaging() {
  console.log('🧪 Testing Firebase Messaging...')
  
  // Test 1: Save a message
  console.log('📝 Saving test message...')
  const messageId = await saveMessage({
    text: 'Hello from Firebase! 💕',
    sender: 'You'
  })
  
  if (messageId) {
    console.log('✅ Message saved successfully! ID:', messageId)
  } else {
    console.log('❌ Failed to save message')
    return
  }
  
  // Test 2: Retrieve messages
  console.log('📥 Retrieving messages...')
  const messages = await getMessages(10)
  
  if (messages && messages.length > 0) {
    console.log('✅ Messages retrieved successfully!')
    console.log('📊 Total messages:', messages.length)
    console.log('📝 Latest message:', messages[0])
  } else {
    console.log('⚠️ No messages found')
  }
  
  console.log('✨ Test complete!')
}

// Run test
testMessaging()
