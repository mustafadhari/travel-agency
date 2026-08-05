const fs = require('fs');
const path = require('path');

// Create placeholder images
const placeholders = [
  { path: 'public/images/blog-authors/team-avatar.jpg', width: 200, height: 200, color: '#004677', text: 'Team' },
  { path: 'public/images/blog-authors/destination-expert.jpg', width: 200, height: 200, color: '#007A78', text: 'Destination Expert' },
  { path: 'public/images/blog-authors/adventure-specialist.jpg', width: 200, height: 200, color: '#F4B942', text: 'Adventure Specialist' },
  { path: 'public/images/blog-authors/budget-guru.jpg', width: 200, height: 200, color: '#2D5A3D', text: 'Budget Guru' },
  { path: 'public/images/blog-authors/luxury-concierge.jpg', width: 200, height: 200, color: '#6B46C1', text: 'Luxury Concierge' },
  { path: 'public/images/blog-covers/india-travel-guide-cover.jpg', width: 1200, height: 630, color: '#004677', text: 'India Travel Guide 2026' },
  { path: 'public/images/blog-placeholder.jpg', width: 1200, height: 630, color: '#007A78', text: 'Blog Post' }
];

// Simple SVG placeholder generator
function createSvgPlaceholder(width, height, color, text) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 10}" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">${text}</text>
</svg>`;
}

// Create directories if they don't exist
const dirs = ['public/images', 'public/images/blog-authors', 'public/images/blog-covers'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate placeholder files
placeholders.forEach(placeholder => {
  const svg = createSvgPlaceholder(
    placeholder.width,
    placeholder.height,
    placeholder.color,
    placeholder.text
  );

  fs.writeFileSync(placeholder.path, svg);
  console.log(`Created: ${placeholder.path}`);
});

console.log('Placeholder images created successfully!');