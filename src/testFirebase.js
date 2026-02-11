import { 
  saveTheme, 
  getTheme, 
  saveMood, 
  getMoods, 
  saveGoals, 
  getGoals, 
  saveMessage, 
  getMessages, 
  saveHugCount, 
  getHugCount, 
  savePhotoReactions, 
  getPhotoReactions, 
  saveMusicVolume, 
  getMusicVolume 
} from './firebaseService.js';

// Test all Firebase functions
const testFirebase = async () => {
  console.log('🔥 Testing Firebase Database Functions...\n');
  
  const tests = [];
  
  // Test 1: Theme Functions
  try {
    console.log('📝 Testing Theme Functions...');
    await saveTheme('test-theme');
    const theme = await getTheme();
    console.log('✅ Theme saved:', theme);
    tests.push({ name: 'Theme Functions', status: 'PASS', result: theme });
  } catch (error) {
    console.log('❌ Theme Functions failed:', error.message);
    tests.push({ name: 'Theme Functions', status: 'FAIL', error: error.message });
  }
  
  // Test 2: Hug Count Functions
  try {
    console.log('\n🤗 Testing Hug Count Functions...');
    await saveHugCount(42);
    const hugCount = await getHugCount();
    console.log('✅ Hug count saved:', hugCount);
    tests.push({ name: 'Hug Count Functions', status: 'PASS', result: hugCount });
  } catch (error) {
    console.log('❌ Hug Count Functions failed:', error.message);
    tests.push({ name: 'Hug Count Functions', status: 'FAIL', error: error.message });
  }
  
  // Test 3: Music Volume Functions
  try {
    console.log('\n🎵 Testing Music Volume Functions...');
    await saveMusicVolume(0.75);
    const volume = await getMusicVolume();
    console.log('✅ Music volume saved:', volume);
    tests.push({ name: 'Music Volume Functions', status: 'PASS', result: volume });
  } catch (error) {
    console.log('❌ Music Volume Functions failed:', error.message);
    tests.push({ name: 'Music Volume Functions', status: 'FAIL', error: error.message });
  }
  
  // Test 4: Mood Functions
  try {
    console.log('\n😊 Testing Mood Functions...');
    const moodId = await saveMood({ 
      mood: 'happy', 
      note: 'Test mood', 
      date: new Date().toISOString() 
    });
    const moods = await getMoods();
    console.log('✅ Mood saved and retrieved:', moods.length, 'moods');
    tests.push({ name: 'Mood Functions', status: 'PASS', count: moods.length });
  } catch (error) {
    console.log('❌ Mood Functions failed:', error.message);
    tests.push({ name: 'Mood Functions', status: 'FAIL', error: error.message });
  }
  
  // Test 5: Goals Functions
  try {
    console.log('\n🎯 Testing Goals Functions...');
    const testGoals = [
      { id: 1, text: 'Test goal 1', completed: false },
      { id: 2, text: 'Test goal 2', completed: true }
    ];
    await saveGoals(testGoals);
    const goals = await getGoals();
    console.log('✅ Goals saved and retrieved:', goals.length, 'goals');
    tests.push({ name: 'Goals Functions', status: 'PASS', count: goals.length });
  } catch (error) {
    console.log('❌ Goals Functions failed:', error.message);
    tests.push({ name: 'Goals Functions', status: 'FAIL', error: error.message });
  }
  
  // Test 6: Message Functions
  try {
    console.log('\n💬 Testing Message Functions...');
    const messageId = await saveMessage({ 
      text: 'Test message', 
      sender: 'user',
      timestamp: new Date().toISOString() 
    });
    const messages = await getMessages();
    console.log('✅ Message saved and retrieved:', messages.length, 'messages');
    tests.push({ name: 'Message Functions', status: 'PASS', count: messages.length });
  } catch (error) {
    console.log('❌ Message Functions failed:', error.message);
    tests.push({ name: 'Message Functions', status: 'FAIL', error: error.message });
  }
  
  // Test 7: Photo Reactions Functions
  try {
    console.log('\n📸 Testing Photo Reactions Functions...');
    const testReactions = { photo1: 5, photo2: 3 };
    await savePhotoReactions(testReactions);
    const reactions = await getPhotoReactions();
    console.log('✅ Photo reactions saved:', reactions);
    tests.push({ name: 'Photo Reactions Functions', status: 'PASS', result: reactions });
  } catch (error) {
    console.log('❌ Photo Reactions Functions failed:', error.message);
    tests.push({ name: 'Photo Reactions Functions', status: 'FAIL', error: error.message });
  }
  
  // Summary
  console.log('\n📊 TEST SUMMARY:');
  console.log('='.repeat(50));
  
  const passed = tests.filter(t => t.status === 'PASS').length;
  const failed = tests.filter(t => t.status === 'FAIL').length;
  
  tests.forEach(test => {
    const icon = test.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${test.name}: ${test.status}`);
    if (test.status === 'FAIL') {
      console.log(`   Error: ${test.error}`);
    }
  });
  
  console.log('\n🎯 OVERALL RESULT:');
  console.log(`✅ Passed: ${passed}/${tests.length}`);
  console.log(`❌ Failed: ${failed}/${tests.length}`);
  
  if (failed === 0) {
    console.log('🎉 ALL TESTS PASSED! Firebase is working perfectly!');
  } else {
    console.log('⚠️  Some tests failed. Check Firebase configuration.');
  }
  
  return { passed, failed, tests };
};

// Export for use in console or component
export { testFirebase };

// Auto-run if in development
if (window.location.hostname === 'localhost') {
  // Uncomment to test immediately
  // testFirebase();
}
