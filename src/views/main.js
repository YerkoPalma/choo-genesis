const html = require('choo/html')
const input = require('../components/input')

const mainView = (state, prev, send) => {
  return html`
    <div class="container">
      <h1 class="bodoni tc lightest-blue pt5 pb3">Welcome <span class="ph3 bg-lightest-blue purple">${state.user.username}</span></h1>
      ${input(state, send)}
    </div>
  `
}

module.exports = mainView
