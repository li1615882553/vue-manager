import Cookies from 'js-cookie';
import store from '../store'

const TokenKey = "authToken";
const USERNAMEKEY = "userName";


export default Object.defineProperties(
  {},
  {
    token: {
      get: () => Cookies.get(TokenKey),
      set: value => value ? Cookies.set(TokenKey, value) : Cookies.remove(TokenKey),
      configurable: false
    },
    username: {
      get: () => Cookies.get(USERNAMEKEY),
      set: value => value ? Cookies.set(USERNAMEKEY, value) : Cookies.remove(USERNAMEKEY),
      configurable: false
    }
  }
)
