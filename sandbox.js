const googlephoto = require('./lib/googlephoto.js')

console.log('Running sandbox...')

var gp = googlephoto()
gp.on('success', function(photoCol){
  console.log('PHOTOS FETCHED')
  if (photoCol){
    for (var i = 0; i < photoCol.length; i++){
      console.log('Photo URL: ' + photoCol[i].src)
    }
  }
})
gp.fetchPhotos()
