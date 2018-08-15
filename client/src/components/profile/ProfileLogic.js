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
user.userFirstname = 'Fabre'
user.userName = 'Enzo'
user.userPseudo = '@enzolezozio'
user.userDescription = "Salut la compagnie ! Moi c'est Enzo mais tu peux m'appeler Zozio comme tout mes amis ! Haha. J'espère qu'on se verra vite dans les nuits Montpellieraines, bisous hihi !"

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
      console: console,
      msgFollow: 'Follow cette douceur'
    }
  },
  components: {
    'friendlist': friendList
  },
  created: async function () {
    user.userPseudo = this.$router.history.current.params.pseudo

    await loadFriends()
    this.friendsList = friends
    this.isFriendsReady = true

    await loadUserProfile(user.userPseudo)
    this.user = user
  },
  methods: {
    changeContentFollowBtn: function (state) {
      if (state) {
        this.msgFollow = 'Follow cette douceur '
      } else {
        this.msgFollow = 'ah gros...'
      }
    }
  }
}

/* ============ LOAD METHODS ============ */
async function loadFriends () {
  await _userService.findAll()
    .then((res) => {
      friends = res
    })
}

async function loadUserProfile (userPseudo) {
  await _userService.findOneFromPseudo(userPseudo)
    .then((res) => {
      user = res[0]
    })
}

/* ============ METHODS ============ */


