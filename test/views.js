/* global describe beforeEach afterEach it */
const chooTest = require('choo-test')
const assert = require('assert')
const sinon = require('sinon')
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
    const h1 = app.$('h1')
    assert.equal(h1.className, 'global-header')
    // input
  })

  it('dispatch backup function', () => {
    const input = app.$('input')
    // changing the value here should trigger the input event
    input.value = 'Test Name'
    app.fire('input', 'input')
    sinon.assert.calledTwice(app.onAction)
    sinon.assert.calledOnce(app.onStateChange)
  })
})
