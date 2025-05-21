// ...existing code or create this file if it doesn't exist...
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // You can add MDX options here if needed
  }
})

module.exports = withMDX({
  // Append the default value with md and mdx extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // ...any other Next.js config...
})
