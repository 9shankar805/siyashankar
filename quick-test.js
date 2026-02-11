// Quick Firebase verification
import { db } from './src/firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const quickTest = async () => {
    console.log('🔥 Quick Firebase Verification...');
    
    try {
        // Test write
        const testRef = doc(db, 'test', 'quickTest');
        await setDoc(testRef, { 
            test: true, 
            timestamp: new Date().toISOString() 
        });
        console.log('✅ Write successful');
        
        // Test read
        const docSnap = await getDoc(testRef);
        if (docSnap.exists()) {
            console.log('✅ Read successful');
            console.log('🎉 Firebase is working!');
            return true;
        } else {
            console.log('❌ Read failed - no data');
            return false;
        }
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        return false;
    }
};

// Auto-run
quickTest();
