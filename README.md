# <%= projectName %> [![built with choo v3](https://img.shields.io/badge/built%20with%20choo-v3-ffc3e4.svg?style=flat-square)](https://github.com/yoshuawuyts/choo)

> Offline first choo app for designers and web developers

## Features

- Offline first
    - Use [localforage](https://github.com/localForage/localForage) for local data storage
    - Use [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), through [sw-precache](https://github.com/GoogleChrome/sw-precache), to cache assets
- Super simple! (*)

(*) _Because all the work to make it offline first happen without your intervention, is all automatic thanks to npm build scripts and [choo offline plugin](https://github.com/YerkoPalma/choo-offline)_

## Usage

```bash
# start an http local server with livereload
$ npm run dev

# run tests
$ npm test

# generate production files in a dist/ folder
$ npm run build
```

## Handling offline status

If you need to handle offline mode, there are some tricks that can help you with. There is an [offline plugin](https://github.com/YerkoPalma/choo-offline) that manipulate choo hooks and wrappers for offline support.
One of that hooks is triggered whenever an action takes place, and has the responsability to trigger a backup function if there is no internet connection.
To use this, you have to send a `_backup` string in your `send` data. This string should be the name of the action that you expect to get executed. So, your model and view should look like this:

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
const view = (state, send) => {
  return html`
    <button onclick=${(e) => send(
        'update',
        { payload: e.target.value, _backup: '_update' }
      )}></button>
  `
}
```

## License

MIT © [Yerko Palma](https://github.com/YerkoPalma)
