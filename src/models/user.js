module.exports = {
  namespace: 'user',
  state: {
    username: 'Stranger'
  },
  reducers: {
    setUsername: (data, state) => ({ username: data.payload })
  },
  effects: {
    update: (data, state, send, done) => {
      send('user:setUsername', { payload: data.payload }, done)
    }
  }
}
