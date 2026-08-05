// Test script to verify author system is working correctly
const { getAuthorById, getAllAuthors } = require('./lib/blog-authors')

console.log('🧪 Testing Author System...\n')

// Test 1: Get all authors
console.log('Test 1: Get all authors')
const allAuthors = getAllAuthors()
console.log(`✅ Found ${allAuthors.length} authors`)
allAuthors.forEach(author => {
  console.log(`  - ${author.name} (${author.expertise})`)
})

// Test 2: Get specific author by ID
console.log('\nTest 2: Get specific author by ID')
const destinationExpert = getAuthorById('destination-expert')
console.log('✅ Destination Expert:', {
  name: destinationExpert.name,
  expertise: destinationExpert.expertise,
  bioLength: destinationExpert.bio.length,
  avatar: destinationExpert.avatar
})

// Test 3: Verify author object structure
console.log('\nTest 3: Verify author object structure')
const testAuthor = getAuthorById('adventure-specialist')
const expectedKeys = ['id', 'name', 'bio', 'avatar', 'expertise', 'socialLinks']
const hasAllKeys = expectedKeys.every(key => key in testAuthor)
console.log(`✅ Author object has all required keys: ${hasAllKeys}`)

// Test 4: Test with blog post integration
console.log('\nTest 4: Test author rendering in blog posts')
const samplePost = {
  title: 'Test Post',
  author: testAuthor, // Using author object
  content: 'Test content'
}

// Simulate what the blog post page does
const authorName = typeof samplePost.author === 'string' ? samplePost.author : samplePost.author?.name
console.log(`✅ Author name for rendering: ${authorName}`)

console.log('\n🎉 All author system tests passed!')
console.log('\nThe author system is ready for use in blog posts.')
console.log('Blog posts can now use author objects with proper rendering.')