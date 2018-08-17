import friendList from '../friendlist/Friendlist'
import CustomSpinner from '../Spinner'
import _service from '../../models/index'

let user = new _service.UserModel()
let friends = []
let isFriend = 'not-friend'

/* ============ EXPORT ============ */
export default {
  name: 'Profile',
  components: {
    spinner: CustomSpinner,
    'friendlist': friendList
  },
  created: async function () {
    this.loadData()
  },
  /* ============ VARIABLES ============ */
  data () {
    return {
      data: [],
      user: user,
      relationWithUser: 'not-friend',
      friendsList: [],
      isLoading: false,
      btnLabel: 'Follow cette douceur',
      btnLabelOff: 'Follow cette douceur',
      btnLabelHover: 'Deviens mon pote'
    }
  },
  methods: {
    /* ============ LOAD METHODS ============ */
    async loadFriends () {
      this.isLoading = true
      await _service.user.findAllFriends(this.user.userId)
        .then((res) => {
          this.friendsList = res
          console.log(this.friendsList)
          this.isLoading = false
        })
        .catch(e => {
          console.log('Unable to load friends')
        })
    },
    async loadUserProfile () {
      this.isLoading = true
      this.user.userPseudo = this.$router.history.current.params.pseudo
      await _service.user.findOneFromPseudo(this.user.userPseudo)
        .then((res) => {
          this.user = res[0]
        })
        .catch(e => {
          console.log('Unable to load user')
        })
      this.isLoading = false
    },
    /* ============ VIEW METHODS ============ */
    async loadData () {
      this.isLoading = true

      await this.loadUserProfile()
      await this.loadFriends()
      this.relationWithUser = 'not-friend' // Should be compute by the back-end
    },

     async friendBtnAction () {
      // Action to perform depending on the state with the user
      if (this.relationWithUser === 'not-friend'){
        await this.follow()
      } else {
        await this.unfollow()
      }
    },
    changeBtnContent () {
      console.log('new relation ', this.relationWithUser)
      if (this.relationWithUser === 'friend') {
        this.btnLabelHover = 'unfollow cet escroc'
        this.btnLabelOff = ''
        this.btnLabel = this.btnLabelOff
      } else if (this.relationWithUser === 'waiting') {
        this.btnLabelHover = 'annuler ma demande'
        this.btnLabelOff = 'en attente'
        this.btnLabel = this.btnLabelOff
      } else {
        this.btnLabelHover = 'Follow  cette douceur'
        this.btnLabelOff = 'deviens mon pote'
        this.btnLabel = this.btnLabelOff
      }
    },
    changeBtnHover (onBtn) {
      if (onBtn) {
        this.btnLabel = this.btnLabelHover
      } else {
        this.btnLabel = this.btnLabelOff
      }
    },

    async follow () {
      let body = {
        userId: this.user.userId, // The user that is wanted to be a friend
        userIdHaveFriend: 4, // Should be the active user from localstorage
        isfriendState: 'waiting'
      }
      await _service.isfriend.create(body)
        .then((res) => {
          this.relationWithUser = 'waiting'
          this.changeBtnContent()
        })
        .catch(e => {
          console.log('Unable to make friend')
        })
    },
    async unfollow () {
      let body = {
        userId: this.user.userId, // The user that is wanted to be unfollowed
        userIdHaveFriend: 4, // Active user from localstorage
      }
      await _service.isfriend.delete(body)
        .then((res) => {
          this.relationWithUser = 'not-friend'
          this.changeBtnContent()
        })
        .catch(e => {
          console.log('Unable to unfollow user')
        })
    }
  },
  watch: {
    '$route': 'loadData'
  }
}
