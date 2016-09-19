const html = require('choo/html')

function input (state, send) {
  return html`
    <div class="flex flex-row flex-wrap justify-center sans-serif">
      <p class="self-center lightest-blue">Not your name? change it!</p>
      <input 
        type="text" 
        class="self-center ml2 pa2"
        value="${state.user.username}"
        oninput=${(e) => send('user:update', { payload: e.target.value })}>
    </div>
  `
}

module.exports = input
