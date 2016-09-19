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
    },
    offUpdate: (data, state, send, done) => {
      console.log('Called the backup update function')
      send('user:setUsername', { payload: 'Default' }, done)
    }
  }
}
