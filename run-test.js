import { testFirebase } from './src/testFirebase.js';

// Run the test immediately
console.log('🔥 Starting Firebase Database Test...');
testFirebase().then(results => {
    console.log('\n📊 Test Complete!');
    console.log(`✅ Passed: ${results.passed}/${results.tests.length}`);
    console.log(`❌ Failed: ${results.failed}/${results.tests.length}`);
    
    if (results.failed === 0) {
        console.log('🎉 Firebase is working perfectly!');
    } else {
        console.log('⚠️ Check Firebase configuration');
    }
}).catch(error => {
    console.error('❌ Test failed:', error);
});
