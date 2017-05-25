var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/comp5347_assignment2', function () {
  console.log('mongodb connected')
})

module.exports = mongoose