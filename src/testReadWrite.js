import { db } from './src/firebase.js';
import { collection, doc, setDoc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

// Simple read/write test
const testReadWrite = async () => {
    console.log('🔥 Testing Firebase Read/Write Operations...\n');
    
    try {
        // Test 1: Simple Write
        console.log('📝 Testing WRITE operation...');
        const testDoc = {
            test: true,
            message: 'Hello Firebase!',
            timestamp: new Date().toISOString(),
            data: { number: 42, text: 'test data' }
        };
        
        const userId = 'test_user_' + Date.now();
        const docRef = doc(db, 'testCollection', userId, 'testDoc', 'testDoc');
        await setDoc(docRef, testDoc);
        console.log('✅ WRITE successful - Data saved to Firebase');
        
        // Test 2: Simple Read
        console.log('\n📖 Testing READ operation...');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const readData = docSnap.data();
            console.log('✅ READ successful - Data retrieved from Firebase');
            console.log('📄 Retrieved data:', readData);
            
            // Verify data integrity
            if (readData.test === true && readData.message === 'Hello Firebase!') {
                console.log('✅ Data integrity verified - Write/Read match!');
            } else {
                console.log('❌ Data integrity failed - Data mismatch');
                return false;
            }
        } else {
            console.log('❌ READ failed - Document not found');
            return false;
        }
        
        // Test 3: Multiple Documents
        console.log('\n📚 Testing multiple documents...');
        for (let i = 1; i <= 3; i++) {
            const multiDocRef = doc(db, 'testCollection', userId, 'multiTest', `doc${i}`);
            await setDoc(multiDocRef, {
                index: i,
                message: `Test document ${i}`,
                created: new Date().toISOString()
            });
        }
        
        // Test 4: Query Documents
        console.log('\n🔍 Testing QUERY operation...');
        const q = query(
            collection(db, 'testCollection', userId, 'multiTest'),
            orderBy('index'),
            limit(3)
        );
        
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        
        console.log(`✅ QUERY successful - Retrieved ${docs.length} documents`);
        docs.forEach((doc, index) => {
            console.log(`📄 Document ${index + 1}:`, doc);
        });
        
        // Test 5: Update Document
        console.log('\n🔄 Testing UPDATE operation...');
        await setDoc(docRef, { 
            ...testDoc, 
            updated: true,
            updateCount: 1 
        }, { merge: true });
        
        const updatedDoc = await getDoc(docRef);
        const updatedData = updatedDoc.data();
        
        if (updatedData.updated === true && updatedData.updateCount === 1) {
            console.log('✅ UPDATE successful - Document updated');
        } else {
            console.log('❌ UPDATE failed - Document not updated properly');
            return false;
        }
        
        console.log('\n🎉 ALL READ/WRITE TESTS PASSED!');
        console.log('🔥 Firebase database operations are working perfectly!');
        console.log('💾 Your database is ready for production use!');
        
        return true;
        
    } catch (error) {
        console.error('❌ READ/WRITE TEST FAILED:', error);
        console.error('Error details:', error.code, error.message);
        
        // Common error explanations
        if (error.code === 'permission-denied') {
            console.log('\n🔧 FIX NEEDED:');
            console.log('Go to Firebase Console → Firestore Database → Rules');
            console.log('Update rules to allow read/write access');
        } else if (error.code === 'unavailable') {
            console.log('\n🔧 FIX NEEDED:');
            console.log('Check internet connection');
            console.log('Verify Firestore Database is enabled');
        } else if (error.code === 'unauthenticated') {
            console.log('\n🔧 FIX NEEDED:');
            console.log('Firebase security rules require authentication');
            console.log('Update rules or enable anonymous auth');
        }
        
        return false;
    }
};

// Export for use
export { testReadWrite };

// Auto-run in browser
if (typeof window !== 'undefined') {
    window.testReadWrite = testReadWrite;
}
