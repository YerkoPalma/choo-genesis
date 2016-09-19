/* global navigator */
const xtend = require('xtend')
const isOnline = require('is-online')
const localforage = require('localforage')

function offline (cb) {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('service-worker.js').then(function (reg) {
      reg.onupdatefound = function () {
        var installingWorker = reg.installing

        installingWorker.onstatechange = function () {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                console.log('New or updated content is available.')
              } else {
                console.log('Content is now available offline!')
              }
              break

            case 'redundant':
              console.error('The installing service worker became redundant.')
              break
          }
        }
      }
    }).catch(function (e) {
      console.error('Error during service worker registration:', e)
    })
  }
  const onStateChange = (data, state, prev, createSend) => {
    localforage.setItem('app', state).then(value => {
      // Do other things once the value has been saved.
    }).catch(err => {
      // This code runs if there were any errors
      console.log(err)
    })
  }
  const onAction = (data, state, name, caller, createSend) => {
    isOnline(function (online) {
      // if we are offline and also have a backup function, dispatch that backup function
      if (!online && data._backup) {
        const backupEffect = data._backup
        delete data._backup
        const send = createSend(backupEffect, true)
        // if is an effect needs to call the done callback, if not, it will add a harmless undefined param
        send(backupEffect, data, false)
      }
    })
  }
  localforage.getItem('app').then(localState => {
    cb({
      onStateChange,
      onAction,
      wrapInitialState: function (appState) {
        return xtend(appState, localState)
      }
    })
  }).catch(err => {
    throw err
  })
}

module.exports = offline
