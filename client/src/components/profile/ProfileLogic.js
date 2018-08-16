import {User} from '../../models/user_model/User_model'
import friendList from '../friendlist/Friendlist'
// import _userService from '../../models/user_model/User_services'
// import _isFriendService from '../../models/isfriend_model/Isfriend_services'
import CustomSpinner from '../Spinner'
import _service from '../../models/index'


/* ============ MODELS ============ */
let userModel = new User()

/* ============ VARIABLES ============ */
let isFriendsReady = false
let user = userModel.mutations()
let friends = []
let isFriend = 'not-friend'

/* ============ EXPORT ============ */
export default {
  name: 'Profile',
  data () {
    return {
      data: [],
      user: user,
      friendsList: [],
      isReady: false,
      isFriendsReady: false,
      console: console,
      msgFollow: 'Follow cette douceur',
      isFriend: false
    }
  },
  components: {
    spinner: CustomSpinner,
    'friendlist': friendList
  },
  created: async function () {
    this.onCreated()
  },
  methods: {
    changeContentFollowBtn: function (state, init) {
      let msg1 = ''
      let msg2 = ''
      if (this.isFriend === 'friend') {
        msg1 = "C'est la famille"
        msg2 = "zbeub zbeub"
      } else if (this.isFriend === 'not-friend') {
        msg1 = 'Follow cette douceur'
        msg2 = 'ah gros...'
        if (init) {
          this.msgFollow = msg1
        }
      } else {
        msg2 = "Comportement"
        msg1 = "Bah ouais"
      }
      if (!init) {
        if (state) {
          this.msgFollow = msg1
        } else {
          this.msgFollow = msg2
        }
      }
    },
    becomeFriend: async function () {
      let answer = await becomeFriend()
      console.log(answer)
      this.msgFollow = "C'est la famille"
      this.isFriend = 'waiting'
    },
    onCreated: async function () {
      this.isReady = false
      this.isFriend = 'not-friend' // Should be compute by the back-end

      user.userPseudo = this.$router.history.current.params.pseudo
      await loadFriends()
      this.friendsList = friends
      this.isFriendsReady = true

      await loadUserProfile(user.userPseudo)
      this.user = user

      this.changeContentFollowBtn(this.isFriend, true)

      this.isReady = true
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'onCreated'
  },
}

/* ============ LOAD METHODS ============ */
async function loadFriends () {
  await _service.user.findAll()
    .then((res) => {
      friends = res
    })
    .catch(e => {
      console.log('Unable to load friends')
    })
}

async function loadUserProfile (userPseudo) {
  await _service.user.findOneFromPseudo(userPseudo)
    .then((res) => {
      user = res[0]
    })
    .catch(e => {
      console.log('Unable to load user')
    })
}

/* ============ METHODS ============ */
async function becomeFriend() {
  // State : friend || waiting
  let body = {
    userId: user.userId, // The user that is wanted to be a friend
    userIdHaveFriend: 4, // Should be the active user from localstorage
    isfriendState: 'waiting'
  }
  await _services.isfriend.create(body)
    .then((res) => {
      isFriend = res
    })
    .catch(e => {
      console.log('Unable to make friend')
    })
}

