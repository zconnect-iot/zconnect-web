export default {
  get() {
    return JSON.parse(localStorage.get('jwt'))
  },
  set(username, password) {
    return localStorage.setItem('jwt', JSON.stringify({ username, password }))
  },
  delete() {
    return localStorage.removeItem('jwt')
  },
}
