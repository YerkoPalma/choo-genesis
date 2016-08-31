const html = require('choo/html')

function input (state, send) {
  return html`
    <div class="input">
      <p class="input-message">Not your name? change it!</p>
      <input 
        type="text" 
        class="input-field"
        oninput=${(e) => send('user:update', { payload: e.target.value })}>
    </div>
  `
}

module.exports = input
