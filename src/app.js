const choo = require('choo')
const sf = require('sheetify')
const offline = require('choo-offline')
const mainView = require('./views/main')

sf('tachyons', { global: true })
sf('./assets/style/main.css', { global: true })

const app = choo()

app.model(require('./models/user'))

app.router(route => [
  route('/', mainView)
])

offline(offline => {
  app.use(offline)

  if (process.env.NODE_ENV !== 'production') {
    const log = require('choo-log')
    app.use(log())
  }
  const tree = app.start()
  document.body.appendChild(tree)
})

// export app for tests
module.exports = app
