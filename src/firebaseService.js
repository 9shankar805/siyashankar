import { db } from './firebase.js';
import { storage } from './firebase.js';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Collection names
const COLLECTIONS = {
  USER_DATA: 'userData',
  MOODS: 'moods',
  GOALS: 'goals',
  MESSAGES: 'messages',
  PHOTOS: 'photos',
  SETTINGS: 'settings',
  POSTS: 'posts',
  LOVE_LETTERS: 'loveLetters',
  GRATITUDE: 'gratitude',
  WISHLIST: 'wishlist',
  VOICE_MESSAGES: 'voiceMessages',
  TIME_CAPSULE: 'timeCapsule',
  INSIDE_JOKES: 'insideJokes',
  FUTURE_PLANS: 'futurePlans'
};

// User ID (you can make this dynamic later)
const getUserId = () => {
  return 'couple_sikha_shankar'; // Single shared ID for the couple
};

// Generic functions
export const saveDocument = async (collectionName, documentId, data) => {
  try {
    const userId = getUserId();
    const docRef = doc(db, collectionName, userId, documentId, documentId);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
    return true;
  } catch (error) {
    console.error('Error saving document:', error);
    return false;
  }
};

export const getDocument = async (collectionName, documentId) => {
  try {
    const userId = getUserId();
    const docRef = doc(db, collectionName, userId, documentId, documentId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};

export const updateDocument = async (collectionName, documentId, data) => {
  try {
    const userId = getUserId();
    const docRef = doc(db, collectionName, userId, documentId, documentId);
    await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
    return true;
  } catch (error) {
    console.error('Error updating document:', error);
    return false;
  }
};

// Specific functions for your features
export const saveTheme = async (theme) => {
  return await saveDocument(COLLECTIONS.SETTINGS, 'theme', { selectedTheme: theme });
};

export const getTheme = async () => {
  const data = await getDocument(COLLECTIONS.SETTINGS, 'theme');
  return data?.selectedTheme || 'romantic';
};

export const saveMood = async (moodData) => {
  const userId = getUserId();
  const moodId = Date.now().toString();
  const docRef = doc(db, COLLECTIONS.MOODS, userId, 'entries', moodId);
  await setDoc(docRef, { ...moodData, createdAt: new Date().toISOString() });
  return moodId;
};

export const getMoods = async (limitCount = 30) => {
  try {
    const userId = getUserId();
    const moodsRef = collection(db, COLLECTIONS.MOODS, userId, 'entries');
    const moodsQuery = query(moodsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(moodsQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting moods:', error);
    return [];
  }
};

export const saveGoals = async (goals) => {
  return await saveDocument(COLLECTIONS.GOALS, 'coupleGoals', { goals });
};

export const getGoals = async () => {
  const data = await getDocument(COLLECTIONS.GOALS, 'coupleGoals');
  return data?.goals || [];
};

export const saveMessage = async (messageData) => {
  const userId = getUserId();
  const messageId = Date.now().toString();
  const docRef = doc(db, COLLECTIONS.MESSAGES, userId, 'chats', messageId);
  await setDoc(docRef, { ...messageData, createdAt: new Date().toISOString() });
  return messageId;
};

// Upload media to Firebase Storage
export const uploadMessageMedia = async (file) => {
  try {
    const userId = getUserId();
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `messages/${userId}/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return {
      url: downloadURL,
      name: file.name,
      type: file.type,
      size: file.size
    };
  } catch (error) {
    console.error('Error uploading media:', error);
    return null;
  }
};

// Delete media from Firebase Storage
export const deleteMessageMedia = async (mediaUrl) => {
  try {
    const storageRef = ref(storage, mediaUrl);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Error deleting media:', error);
    return false;
  }
};

export const getMessages = async (limitCount = 50) => {
  try {
    const userId = getUserId();
    const messagesRef = collection(db, COLLECTIONS.MESSAGES, userId, 'chats');
    const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(messagesQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).reverse();
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
};

export const saveHugCount = async (count) => {
  return await saveDocument(COLLECTIONS.SETTINGS, 'hugs', { count });
};

export const getHugCount = async () => {
  const data = await getDocument(COLLECTIONS.SETTINGS, 'hugs');
  return data?.count || 0;
};

export const savePhotoReactions = async (reactions) => {
  return await saveDocument(COLLECTIONS.PHOTOS, 'reactions', { reactions });
};

export const getPhotoReactions = async () => {
  const data = await getDocument(COLLECTIONS.PHOTOS, 'reactions');
  return data?.reactions || {};
};

export const saveMusicVolume = async (volume) => {
  return await saveDocument(COLLECTIONS.SETTINGS, 'music', { volume });
};

export const getMusicVolume = async () => {
  const data = await getDocument(COLLECTIONS.SETTINGS, 'music');
  return data?.volume || 0.5;
};

// Posts functions
export const savePost = async (postData) => {
  const userId = getUserId();
  const postId = Date.now().toString();
  const docRef = doc(db, COLLECTIONS.POSTS, userId, 'feed', postId);
  await setDoc(docRef, { ...postData, createdAt: new Date().toISOString() });
  return postId;
};

export const getPosts = async (limitCount = 50) => {
  try {
    const userId = getUserId();
    const postsRef = collection(db, COLLECTIONS.POSTS, userId, 'feed');
    const postsQuery = query(postsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(postsQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
};

export const updatePost = async (postId, postData) => {
  const userId = getUserId();
  const docRef = doc(db, COLLECTIONS.POSTS, userId, 'feed', postId);
  await updateDoc(docRef, { ...postData, updatedAt: new Date().toISOString() });
  return true;
};

export const deletePost = async (postId) => {
  try {
    const userId = getUserId();
    const docRef = doc(db, COLLECTIONS.POSTS, userId, 'feed', postId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
};

// Albums functions
export const saveAlbum = async (albumData) => {
  const userId = getUserId();
  await setDoc(doc(db, COLLECTIONS.PHOTOS, userId, 'albums', 'data'), albumData);
  return true;
};

export const getAlbums = async () => {
  try {
    const userId = getUserId();
    const docRef = doc(db, COLLECTIONS.PHOTOS, userId, 'albums', 'data');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error getting albums:', error);
    return null;
  }
};

// Generic save/get for collections
export const saveToCollection = async (collectionName, data) => {
  const userId = getUserId();
  const docId = Date.now().toString();
  await setDoc(doc(db, collectionName, userId, 'items', docId), { ...data, createdAt: new Date().toISOString() });
  return docId;
};

export const getFromCollection = async (collectionName, limitCount = 50) => {
  try {
    const userId = getUserId();
    const itemsRef = collection(db, collectionName, userId, 'items');
    const itemsQuery = query(itemsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(itemsQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error getting ${collectionName}:`, error);
    return [];
  }
};

export const deleteFromCollection = async (collectionName, docId) => {
  try {
    const userId = getUserId();
    await deleteDoc(doc(db, collectionName, userId, 'items', docId));
    return true;
  } catch (error) {
    console.error(`Error deleting from ${collectionName}:`, error);
    return false;
  }
};

export const saveCollectionData = async (collectionName, data) => {
  const userId = getUserId();
  await setDoc(doc(db, collectionName, userId, 'data', 'main'), data);
  return true;
};

export const getCollectionData = async (collectionName) => {
  try {
    const userId = getUserId();
    const docRef = doc(db, collectionName, userId, 'data', 'main');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error(`Error getting ${collectionName}:`, error);
    return null;
  }
};

// FCM Token management
export const saveFCMToken = async (token) => {
  const userId = getUserId();
  const userName = localStorage.getItem('userName') || 'User';
  await setDoc(doc(db, 'fcmTokens', userId), {
    token,
    userName,
    updatedAt: new Date().toISOString()
  });
};

export const getPartnerFCMToken = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'fcmTokens'));
    const currentUserId = getUserId();
    const tokens = [];
    querySnapshot.forEach((doc) => {
      if (doc.id !== currentUserId) {
        tokens.push(doc.data().token);
      }
    });
    return tokens;
  } catch (error) {
    console.error('Error getting partner tokens:', error);
    return [];
  }
};

// Migration helper - move from localStorage to Firebase
export const syncAllDataToFirebase = async () => {
  console.log('🔄 Syncing data to Firebase...');
  
  // Sync theme
  const theme = localStorage.getItem('selectedTheme');
  if (theme) await saveTheme(theme);
  
  // Sync hug count
  const hugCount = localStorage.getItem('hugCount');
  if (hugCount) await saveHugCount(parseInt(hugCount));
  
  // Sync music volume
  const volume = localStorage.getItem('musicVolume');
  if (volume) await saveMusicVolume(parseFloat(volume));
  
  // Sync moods
  const moods = localStorage.getItem('moodHistory');
  if (moods) {
    const moodData = JSON.parse(moods);
    for (const mood of moodData) {
      await saveMood(mood);
    }
  }
  
  // Sync goals
  const goals = localStorage.getItem('coupleGoals');
  if (goals) await saveGoals(JSON.parse(goals));
  
  // Sync photo reactions
  const reactions = localStorage.getItem('photoReactions');
  if (reactions) await savePhotoReactions(JSON.parse(reactions));
  
  console.log('✅ Sync complete!');
};

export const loadAllDataFromFirebase = async () => {
  console.log('📥 Loading data from Firebase...');
  
  // Load theme
  const theme = await getTheme();
  if (theme) localStorage.setItem('selectedTheme', theme);
  
  // Load hug count
  const hugCount = await getHugCount();
  localStorage.setItem('hugCount', hugCount.toString());
  
  // Load music volume
  const volume = await getMusicVolume();
  localStorage.setItem('musicVolume', volume.toString());
  
  // Load moods
  const moods = await getMoods(30);
  if (moods.length > 0) localStorage.setItem('moodHistory', JSON.stringify(moods));
  
  // Load goals
  const goals = await getGoals();
  if (goals.length > 0) localStorage.setItem('coupleGoals', JSON.stringify(goals));
  
  // Load photo reactions
  const reactions = await getPhotoReactions();
  if (Object.keys(reactions).length > 0) localStorage.setItem('photoReactions', JSON.stringify(reactions));
  
  // Load posts
  const posts = await getPosts(50);
  if (posts.length > 0) localStorage.setItem('facebookPosts', JSON.stringify(posts));
  
  console.log('✅ Load complete!');
};
