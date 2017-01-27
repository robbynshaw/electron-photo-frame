module.exports = function(userID) {
  const electronOauth2 = require('electron-oauth2')
  const request = require('request')
  const EventEmitter = require('events')

  const baseUrl = 'https://picasaweb.google.com/data/feed/api/user/';

  var M = new EventEmitter()

  // private variables
  var photoCol = [];
  var albumsToFetch = 0;
  var albumsFetched = 0;

  request.defaults({
    headers: {
      'GData-Version': '2'
    }
  });

  function getAlbums(){
    request({
      uri: baseUrl + userID,
      qs: {
        'alt': 'json'
      },
      method: 'GET'
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('Album list request successful')
        var obj = JSON.parse(body);
        if (obj && obj.feed && obj.feed.entry){
          var entries = obj.feed.entry
          for (var i = 0; i < entries.length; i++){
            var entry = entries[i]
            if (entry){
              var albumIDObj = entry['gphoto$id']
              if (albumIDObj){
                var albumID = albumIDObj['$t']
                if (albumID){
                  console.log('Fetching album "' + albumID + '"')
                  albumsToFetch++
                  getAlbumPhotos(albumID)
                }
              }
            }
          }
        }
      }
    })
  }

  function getAlbumPhotos(albumID){
    request({
      uri: baseUrl + userID + '/albumid/' + albumID,
      qs: {
        'alt': 'json'
      },
      method: 'GET'
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('Album request successful')
        var obj = JSON.parse(body)
        if (obj && obj.feed && obj.feed.entry){
          var entries = obj.feed.entry
          for (var i = 0; i < entries.length; i++){
            var entry = entries[i];
            photoCol.push(entry.content);
          }
          albumsFetched++
          if (albumsToFetch == albumsFetched){
            M.emit('success', photoCol)
          }
        }
      }
    })
  }

  // var config = {
  //     clientId: '961981635988-gjae6fhqebr7di9atlah3bsbos1alfsr.apps.googleusercontent.com',
  //     clientSecret: 'n6BYOfmBeuuAyy7h99BMVfBc',
  //     authorizationUrl: 'AUTHORIZATION_URL',
  //     tokenUrl: 'TOKEN_URL',
  //     useBasicAuthorizationHeader: false,
  //     redirectUri: 'http://localhost'
  // };
  //
  // app.on('ready', () => {
  //   const windowParams = {
  //     alwaysOnTop: true,
  //     autoHideMenuBar: true,
  //     webPreferences: {
  //         nodeIntegration: false
  //     }
  //   }
  //
  //   const options = {
  //     scope: 'https://picasaweb.google.com/data/',
  //     accessType: 'ACCESS_TYPE'
  //   };
  //
  //   const myApiOauth = electronOauth2(config, windowParams);
  //
  //   myApiOauth.getAccessToken(options)
  //     .then(token => {
  //       // use your token.access_token
  //
  //       myApiOauth.refreshToken(token.refresh_token)
  //         .then(newToken => {
  //           //use your new token
  //         });
  //     });
  // });
  M.fetchPhotos = function(){
    getAlbums();
  }

  return M;
}
