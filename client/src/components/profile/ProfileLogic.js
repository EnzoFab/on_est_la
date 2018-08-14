import {User} from '../../models/user_model/User_model'
import friendList from '../friendlist/Friendlist'
import _userService from '../../models/user_model/User_services'

/* ============ MODELS ============ */
let userModel = new User()

/* ============ VARIABLES ============ */
let isReady = false;
let user = userModel.mutations()
let friends = ['bella']

/* ============ TEMPORARY VARIABLES ============ */
user.user_firstname = 'Fabre'
user.user_name = 'Enzo'
user.user_pseudo = '@enzolezozio'
user.user_description = "Salut la compagnie ! Moi c'est Enzo mais tu peux m'appeler Zozio comme tout mes amis ! Haha. J'espère qu'on se verra vite dans les nuits Montpellieraines, bisous hihi !"

/* ============ EXPORT ============ */
export default {
  name: 'Profile',
  created: async function () {
    /* friends = await loadFriends()
    console.log(friends) */
  },
  data() {
    return {
      message: 'Welcome to Your On est là hein App',
      user: user,
      friends: loadFriends,
      isReady: isReady,
      console: console
    }
  },
  methods: {
    change: function change() {
      isReady = !isReady
      console.log(isReady)
    },
  },
  components: {
    'friendlist': friendList
  }
}

/* ============ LOAD METHODS ============ */
async function loadFriends () {
  _userService.findAll()
    .then((res) => {
      console.log('Logic data : ', res)
      return res
    })
}

/* ============ METHODS ============ */
function change () {
  isReady = !isReady
  console.log(isReady)
}


