// install-keys
var path = require('path')
  , fs = require('fs')
  , stream = require('stream')

  , request = require('request')
  , JSONStream = require('JSONStream')

if (!stream.Transform) stream = require('readable-stream')

module.exports = function (username, aKeys) {
  if (!username) return console.error('Must provide github username.')
  var newLineStream = new stream.Transform
  if (!aKeys) aKeys = path.join(process.env.HOME, '.ssh', 'authorized_keys')
  newLineStream._transform = addNewLine
  console.log('Confirm that the correct (and only correct) keys were added to ' + aKeys)
  return request('https://api.github.com/users/' + username + '/keys')
    .pipe(JSONStream.parse([true, 'key']))
    .pipe(newLineStream)
    .pipe(fs.createWriteStream(aKeys, {flags: 'a'}))
}

function addNewLine (chunk, encoding, cb) {
  cb(null, chunk + '\n')
}

