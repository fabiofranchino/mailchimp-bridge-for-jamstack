// wt create --bundle index.js

const lib = require('./index.js')

lib({ query: { e: 'my@email.com' } }, (err, res) => {
  console.log(err, res)
})
