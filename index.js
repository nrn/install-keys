// install-keys
var path = require('path')
  , fs = require('fs')
  , stream = require('stream')

  , request = require('request')
  , JSONStream = require('JSONStream')

module.exports = function (username) {
  if (!username) return console.error('Must provide github username.')
  var newLineStream = new stream.Transform
  newLineStream._transform = addNewLine
  console.log('Confirm that the correct (and only correct) keys were added to ~/.ssh/authorized_keys')
  return request('https://api.github.com/users/' + username + '/keys')
    .pipe(JSONStream.parse([true, 'key']))
    .pipe(newLineStream)
    .pipe(fs.createWriteStream(
          path.join(process.env.HOME, '.ssh', 'authorized_keys')
          , {flags: 'a'})
    )
}

function addNewLine (chunk, encoding, cb) {
  cb(null, chunk + '\n')
}

