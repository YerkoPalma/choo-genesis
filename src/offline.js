/* global navigator */
const xtend = require('xtend')
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
      console.log(value)
    }).catch(err => {
      // This code runs if there were any errors
      console.log(err)
    })
  }
  localforage.getItem('app').then(localState => {
    cb({
      onStateChange,
      wrapInitialState: function (appState) {
        return xtend(appState, localState)
      }
    })
  }).catch(err => {
    throw err
  })
}

module.exports = offline
