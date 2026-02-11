import { testFirebase } from './src/testFirebase.js';

// Auto-run test when page loads
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🔥 Starting Firebase Database Test in Browser...');
    
    const resultsDiv = document.getElementById('results');
    const statusDiv = document.getElementById('status');
    
    statusDiv.style.display = 'block';
    statusDiv.innerHTML = '⏳ Testing Firebase connection... Please wait...';
    
    try {
        const results = await testFirebase();
        
        statusDiv.style.display = 'none';
        
        let output = '🔥 FIREBASE DATABASE TEST RESULTS\n';
        output += '='.repeat(50) + '\n\n';
        
        results.tests.forEach(test => {
            const icon = test.status === 'PASS' ? '✅' : '❌';
            output += `${icon} ${test.name}: ${test.status}\n`;
            if (test.status === 'FAIL') {
                output += `   Error: ${test.error}\n`;
            } else if (test.result !== undefined) {
                output += `   Result: ${JSON.stringify(test.result)}\n`;
            } else if (test.count !== undefined) {
                output += `   Count: ${test.count}\n`;
            }
            output += '\n';
        });
        
        output += '='.repeat(50) + '\n';
        output += `📊 SUMMARY:\n`;
        output += `✅ Passed: ${results.passed}/${results.tests.length}\n`;
        output += `❌ Failed: ${results.failed}/${results.tests.length}\n\n`;
        
        if (results.failed === 0) {
            output += '🎉 ALL TESTS PASSED!\n';
            output += '🔥 Firebase is working perfectly!\n';
            output += '💾 Your database is ready for the love website!\n';
            output += '\n🚀 You can now update your components to use Firebase!';
        } else {
            output += '⚠️  Some tests failed.\n';
            output += '🔧 Check your Firebase configuration.\n';
            output += '📝 Make sure Firestore Database is enabled in Firebase Console.\n';
        }
        
        resultsDiv.style.display = 'block';
        resultsDiv.textContent = output;
        
        console.log('✅ Firebase test completed successfully!');
        
    } catch (error) {
        statusDiv.style.display = 'none';
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = `
            <div style="color: #f44336; font-weight: bold;">
                ❌ TEST FAILED: ${error.message}
            </div>
            <p style="margin-top: 10px;">
                Check console for more details. Common issues:
            </p>
            <ul style="text-align: left; margin-top: 10px;">
                <li>Firestore Database not enabled in Firebase Console</li>
                <li>Security rules blocking read/write access</li>
                <li>Incorrect Firebase configuration</li>
                <li>Network connectivity issues</li>
            </ul>
        `;
        
        console.error('❌ Firebase test failed:', error);
    }
});
