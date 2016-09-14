# <%= projectName %> [![built with choo v3](https://img.shields.io/badge/built%20with%20choo-v3-ffc3e4.svg?style=flat-square)](https://github.com/yoshuawuyts/choo)

> Offline first choo app for designers and web developers

## Features

- Offline first
    - Use [localforage](https://github.com/localForage/localForage) for local data storage
    - Use [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), through [sw-precache](https://github.com/GoogleChrome/sw-precache), to cache assets
- [Trello design pattern](https://github.com/trello/trellisheets/blob/master/styleguide.md) for stylesheets
- Super simple! (*)

(*) _Because all the work to make it offline first happen without your intervention, is all automatic thanks to npm build scripts and choo hooks_

## Usage

```bash
# start an http local server with livereload
$ npm run dev

# run tests
$ npm test

# generate production files in a dist/ folder
$ npm run build
```

## Hanling offline status

If you need to handle offline mode, there are some tricks that can help you with. There is an [offline plugin](./src/offline.js) that manipulate choo hooks and wrappers for offline support.
One of that hooks is triggered whenever an action takes place, and has the responsability to trigger a backup function if there is no internet connection.
To use this, you have to send a `_backup` string in your `send` data. This string should be the name of the action that you expect to get executed.

```javascript
const model = {
  state: {
    username: '',
    pass: ''
  },
  reducers: {
    logIn: (data, state) => data.user
  },
  effects: {
    connect: (data, state, send, done) => {
      send('logIn', { _backup: '_connect' }, done)
    },
    _connect: (data, state, send, done) => {
      send('logIn', {}, done)
    }
  }
}

```

## License

MIT © [Yerko Palma](https://github.com/YerkoPalma)
