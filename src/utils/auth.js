import Cookies from 'js-cookie'

const TokenKey = 'fluke-ihrm-token'
const TimeKey = 'fluke-timeStamp'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getTimeStamp() {
  return Cookies.get(TimeKey)
}
export function setTimeStamp() {
  Cookies.set(TimeKey, Date.now())
}
export function removeTimeStamp() {
  return Cookies.remove(TimeKey)
}
