const postcssPurgecss = require('@fullhuman/postcss-purgecss')
const postcss = postcssPurgecss({
  // content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // whitelistPatterns: [/el-.+$/],
  // whitelistPatternsChildren: [/el-.+$/]
})
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
    // postcss
  }
}
