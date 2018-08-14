import {User} from '../../models/user_model/User_model'
import friendList from '../friendlist/Friendlist'
import _userService from '../../models/user_model/User_services'

/* ============ MODELS ============ */
let userModel = new User()

/* ============ VARIABLES ============ */
let isReady = false;
let isFriendsReady = false
let user = userModel.mutations()
let friends = []

/* ============ TEMPORARY VARIABLES ============ */
user.user_firstname = 'Fabre'
user.user_name = 'Enzo'
user.user_pseudo = '@enzolezozio'
user.user_description = "Salut la compagnie ! Moi c'est Enzo mais tu peux m'appeler Zozio comme tout mes amis ! Haha. J'espère qu'on se verra vite dans les nuits Montpellieraines, bisous hihi !"

/* ============ EXPORT ============ */
export default {
  name: 'Profile',
    data() {
    return {
      data: [],
      user: user,
      friendsList: [],
      isReady: isReady,
      isFriendsReady: false,
      console: console
    }
  },
  components: {
    'friendlist': friendList
  },
  created: async function () {
    await loadFriends()
    this.friendsList = friends
    this.isFriendsReady = true
  },
}

/* ============ LOAD METHODS ============ */
async function loadFriends () {
  await _userService.findAll()
    .then((res) => {
      friends = res
    })
}

/* ============ METHODS ============ */


