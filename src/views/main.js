const html = require('choo/html')
const localforage = require('localforage')
const input = require('../components/input')

const mainView = (state, prev, send) => {
  return html`
    <div class="container" onload=${loadLocalState(this, state, send)}>
      <h1 class="global-header">Welcome <span class="global-header-highlight">${state.user.username}</span></h1>
      ${input(state, send)}
    </div>
  `
}

module.exports = mainView

function loadLocalState (element, state, send) {
  return function () {
    if (state.user.initial && process.env.NODE_ENV !== 'test') {
      localforage.getItem('app').then(localState => {
        send('user:init', { localState })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
