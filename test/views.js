/* global describe beforeEach afterEach it */
const chooTest = require('choo-test')
const assert = require('assert')
const mainView = require('../src/views/main')
const userModel = require('../src/models/user')

describe('choo-app', () => {
  let app

  beforeEach(() => {
    app = chooTest()
    app.model(userModel)
    app.router((route) => [route('/', mainView)])
    app.start()
  })

  afterEach(() => {
    app.restore()
  })

  it('renders the view', () => {
    const b = app.$('h1')
    assert.equal(b.className, 'global-header')
  })
})
