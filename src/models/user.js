module.exports = {
  namespace: 'user',
  state: {
    username: 'Stranger',
    initial: true
  },
  reducers: {
    setUsername: (data, state) => ({ username: data.payload }),
    start: (data, state) => {
      let localState = data.localState.user
      localState.initial = false
      return localState
    }
  },
  effects: {
    update: (data, state, send, done) => {
      send('user:setUsername', { payload: data.payload }, done)
    },
    init: (data, state, send, done) => {
      send('user:start', { localState: data.localState }, done)
    }
  }
}
