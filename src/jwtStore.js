export default {
  get() {
    return JSON.parse(localStorage.getItem('zcjwt'))
  },
  set(username, password) {
    return localStorage.setItem('zcjwt', JSON.stringify({ username, password }))
  },
  delete() {
    return localStorage.removeItem('zcjwt')
  },
}
