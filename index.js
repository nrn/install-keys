// install-keys
var path = require('path')
  , fs = require('fs')
  , stream = require('stream')
  , request = require('request')
  , JSONStream = require('JSONStream')
  , addNewLine = new stream.Transform

addNewLine._transform = function (chunk, encoding, cb) {
  cb(null, chunk + '\n')
}

module.exports = function (username) {
  if (!username) return
  return request('https://api.github.com/users/' + username + '/keys')
    .pipe(JSONStream.parse([true, 'key']))
    .pipe(addNewLine)
    .pipe(fs.createWriteStream(
          path.join(process.env.HOME, '.ssh', 'authorized_keys')
          , {flags: 'a'})
        )

}

