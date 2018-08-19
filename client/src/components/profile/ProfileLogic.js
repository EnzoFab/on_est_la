import friendList from '../friendlist/Friendlist'
import CustomSpinner from '../Spinner'
import _service from '../../models/index'
import store from '@/store/store'

let user = new _service.UserModel()

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
      listoffriends: [],
      isLoading: false,
      btnLabel: 'Follow cette douceur',
      invitations: [],
      dialogNotifications: false
    }
  },
  methods: {
    /* ============ LOAD METHODS ============ */
    async loadFriends () {
      this.isLoading = true
      await _service.user.findAllFriends(this.user.userId)
        .then((res) => {
          this.listoffriends = res
          this.isLoading = false
        })
        .catch(e => {
          console.log('Unable to load friends')
        })
    },
    async loadAllInvitations () {
      this.isLoading = true
      // We will use userId = 4
      await _service.isfriend.findAllInvitations(4)
        .then((res) => {
          this.invitations = res
          this.isLoading = false
        })
        .catch(e => {
          console.log('Unable to load user')
        })
      this.isLoading = false
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
      this.dialogNotifications = false


      await this.loadUserProfile()
      await this.loadFriends()
      await this.findRelation()
      await this.loadAllInvitations()
    },

     async friendBtnAction () {
      console.log('ACTION')
      // Action to perform depending on the state with the user
      if (this.relationWithUser === 'not-friend'){
        await this.follow()
      } else {
        await this.unfollow()
      }
    },
    changeBtnContent () {
      if (this.relationWithUser === 'friend') {
        this.btnLabel = ''
      } else if (this.relationWithUser === 'waiting') {
        this.btnLabel = 'en attente'
      } else {
        this.btnLabel = 'deviens mon pote'
      }
    },
    dialogOpen (state) {
      this.dialogNotifications = state
    },
    goToProfile (friend) {
      this.$router.push({ name: 'user-profile', params: { pseudo: friend.userPseudo.toString().toLowerCase() } })
      this.dialogNotifications = false
    },


    async acceptInvitation () {
      let bodyInverse = {
        userId: 4,// Should be the active user from localstorage
        userIdHaveFriend: this.user.userId, // The user that is wanted to be a friend
        isfriendState: 'friend'
      }
      let answer = false
      await _service.isfriend.update(bodyInverse)
        .then((res) => {
          answer = res
        })
        .catch(e => {
          console.log('Unable to accept invitation')
        })
      if (answer) {
        let body = {
          userId: this.user.userId, // The user that is wanted to be a friend
          userIdHaveFriend: 4, // Should be the active user from localstorage
          isfriendState: 'friend'
        }
        await _service.isfriend.create(body)
          .then((res) => {
            this.relationWithUser = 'friend'
            this.changeBtnContent()
          })
          .catch(e => {
            console.log('Unable to create the new friend')
          })
      }
    },
    async acceptInvitationFromNotification (userId) {
      let bodyInverse = {
        userId: 4,// Should be the active user from localstorage
        userIdHaveFriend: userId, // The user that is wanted to be a friend
        isfriendState: 'friend'
      }
      let answer = false
      await _service.isfriend.update(bodyInverse)
        .then((res) => {
          this.loadAllInvitations()
          this.loadFriends()
          this.dialogNotifications = false
        })
        .catch(e => {
          console.log('Unable to accept invitation')
        })
      let body = {
        userId: userId, // The user that is wanted to be a friend
        userIdHaveFriend: 4,// Should be the active user from localstorage
        isfriendState: 'friend'
      }
      await _service.isfriend.create(body)
        .catch(e => {
          console.log('Unable to create the link')
        })
    },
    async refuseInvitationFromNotification (userId) {
      let bodyInverse = {
        userId: 4,// Should be the active user from localstorage
        userIdHaveFriend: userId, // The user that wanted to be friend
      }
      await _service.isfriend.delete(bodyInverse)
        .then((res) => {
          this.loadAllInvitations()
          this.dialogNotifications = false
        })
        .catch(e => {
          console.log('Unable to refuse invitation')
        })
    },

    async follow () {
      console.log(store.getters)
      let body = {
        userId: this.user.userId, // The user that will receive the invitation
        userIdHaveFriend: store.getters.getUser.userId,
        isfriendState: 'waiting'
      }
      await _service.isfriend.create(body)
        .then((res) => {
          this.relationWithUser = res.data.isfriendState
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
        .catch(e => {
          console.log('Unable to unfollow user')
        })
      if (this.relationWithUser === 'friend') {
        await _service.isfriend.delete(body)
          .catch(e => {
            console.log('Unable to unfollow user')
          })
      }
      this.relationWithUser = 'not-friend'
      this.changeBtnContent()
    },
    async findRelation () {
      this.isLoading = true
      let body = {
        userId: this.user.userId, // The user of the profile
        userIdHaveFriend: 4, // Should be the active user from localstorage
      }
      await _service.isfriend.findOneInvitation(body)
        .then((res) => {
          this.relationWithUser = res[0].isfriendState
          this.changeBtnContent()
          this.isLoading = false
        })
        .catch(e => {
          this.relationWithUser = 'not-friend'
          console.log('Unable to get the relation')
          this.changeBtnContent()
          this.isLoading = false
        })
    }
  },
  watch: {
    '$route': 'loadData'
  }
}
