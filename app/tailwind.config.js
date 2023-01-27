module.exports = {
  content: [
    'index.html','./src/**/*.{js,jsx,ts,tsx,vue,html}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
