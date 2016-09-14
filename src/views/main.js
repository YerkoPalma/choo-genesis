const html = require('choo/html')
const input = require('../components/input')

const mainView = (state, prev, send) => {
  return html`
    <div class="container">
      <h1 class="global-header">Welcome <span class="global-header-highlight">${state.user.username}</span></h1>
      ${input(state, send)}
    </div>
  `
}

module.exports = mainView
