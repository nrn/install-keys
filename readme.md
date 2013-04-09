# Install Keys

Install your ssh pub keys from github as authorized keys.

```bash
  npm install -g install-keys && install-keys username
```

Can also specify an optional second argument for authorized_keys file
location, defaults to ~/.ssh/authorized_keys.

require('install-keys') returns a function that takes the same
two arguments, github username, and optional path to append keys to.

