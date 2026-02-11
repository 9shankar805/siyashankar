const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotification = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }

  try {
    const { tokens, notification, data } = req.body;

    if (!tokens || tokens.length === 0) {
      res.status(400).send('No tokens provided');
      return;
    }

    const message = {
      notification: {
        title: notification.title,
        body: notification.body
      },
      data: data || {},
      tokens: tokens
    };

    const response = await admin.messaging().sendMulticast(message);
    
    res.status(200).json({
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

exports.onNewMessage = functions.firestore
  .document('messages/{userId}/chats/{messageId}')
  .onCreate(async (snap, context) => {
    const message = snap.data();
    const userId = context.params.userId;

    const tokensSnapshot = await admin.firestore().collection('fcmTokens').get();
    const partnerTokens = [];
    
    tokensSnapshot.forEach(doc => {
      if (doc.id !== userId) {
        partnerTokens.push(doc.data().token);
      }
    });

    if (partnerTokens.length === 0) return;

    await admin.messaging().sendMulticast({
      tokens: partnerTokens,
      notification: {
        title: `💬 ${message.sender}`,
        body: message.text.substring(0, 100)
      }
    });
  });

exports.onNewPost = functions.firestore
  .document('posts/{userId}/feed/{postId}')
  .onCreate(async (snap, context) => {
    const post = snap.data();
    const userId = context.params.userId;

    const tokensSnapshot = await admin.firestore().collection('fcmTokens').get();
    const partnerTokens = [];
    
    tokensSnapshot.forEach(doc => {
      if (doc.id !== userId) {
        partnerTokens.push(doc.data().token);
      }
    });

    if (partnerTokens.length === 0) return;

    await admin.messaging().sendMulticast({
      tokens: partnerTokens,
      notification: {
        title: `📸 ${post.author} posted`,
        body: post.content?.substring(0, 100) || 'Posted a photo'
      }
    });
  });
