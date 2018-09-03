import friendList from '../friendlist/Friendlist'
import CustomSpinner from '../Spinner'
import _service from '../../models/index'
import _helper from '../../helpers/index'
import store from '@/store/store'

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
      user: {},
      isUserActive: false,
      relationWithUser: 'not-friend',
      listoffriends: [],
      isLoading: false,
      btnLabel: 'Follow cette douceur',
      btnColor: 'info',
      invitations: [],
      dialogNotifications: false,
      dialogUpdate: false,
      snackbar: {
        state: false,
        y: 'top',
        mode: '',
        timeout: 6000,
        text: 'Modifications enregistrées petit frère !'
      },
      numberFrequent: 0,
      ratioFrequent: 0
    }
  },
  methods: {
    /* ============ LOAD METHODS ============ */
    async loadData () {
      this.isLoading = true
      this.dialogNotifications = false

      await this.loadUserProfile()
      await this.loadFriends()
      this.isMyProfile()
      await this.loadAllInvitations()
      await this.loadStats()
      await this.findRelation()
    },
    async loadFriends () {
      this.isLoading = true
      this.listoffriends = await _service.user.findAllFriends(this.user.userId)
      this.isLoading = false
    },
    async loadAllInvitations () {
      if (this.isUserActive) {
        this.isLoading = true
        let userId = store.getters.getUser.userId
        this.invitations = await _service.isfriend.findAllInvitations(userId)
        this.isLoading = false
      }
    },
    async loadUserProfile () {
      this.isLoading = true
      this.user.userPseudo = this.$router.history.current.params.pseudo
      let res = await _service.user.findOneFromPseudo(this.user.userPseudo)
      this.user = res[0]
      this.isLoading = false
    },
    async loadStats () {
      this.isLoading = true
      // Need to get only finished party
      let frequent = await _service.frequentUser.findAllFrequentFromUserId(this.user.userId)
      this.numberFrequent = frequent.length
      this.ratioFrequent = this.numberFrequent / _helper.date.daysBetweenDates(this.user.userDateInscription, new Date()) * 7
      this.isLoading = false
    },

    /* ============ CHECK METHODS ============ */
    isMyProfile () {
      let userDisplayed = this.$router.history.current.params.pseudo
      let activeUser = store.getters.getUser
      this.isUserActive = (userDisplayed === activeUser.userPseudo)
    },
    async findRelation () {
      // Return : friend || waiting || not-friend
      if (!this.isUserActive) {
        this.isLoading = true
        let body = {
          userId: this.user.userId, // The user of the profile
          userIdHaveFriend: store.getters.getUser.userId, // The active user
        }
        this.relationWithUser = await _service.isfriend.findOneInvitation(body)
      } else {
        this.relationWithUser = 'me'
      }
      this.changeBtnContent()
      this.isLoading = false
    },

    /* ============ VIEW METHODS ============ */
    async saveProfile () {
      if (this.isUserActive) {
        this.snackbar.state = await _service.user.update(this.user)
      }
    },
    async friendBtnAction () {
      // Action to perform depending on the state with the user
      if (this.relationWithUser === 'not-friend'){
        await this.follow(this.user.userId)
      } else {
        await this.unfollow(this.user.userId)
      }
    },
    changeBtnContent () {
      if (this.relationWithUser === 'friend') {
        this.btnLabel = "c'est la famille"
        this.btnColor = 'success'
      } else if (this.relationWithUser === 'waiting') {
        this.btnLabel = 'en attente'
        this.btnColor = 'warning'
      } else if (this.relationWithUser === 'not-friend') {
        this.btnLabel = 'deviens mon pote'
        this.btnColor = 'info'
      } else {
        this.btnLabel = "en vrai t'es doux"
        this.btnColor = 'info'
      }
    },
    dialogOpen (state) {
      // If State = true, then we show notifications to the user only if it's his profile
      if (this.isUserActive) {
        this.dialogNotifications = state
      }
    },
    goToProfile (friend) {
      // When a user of the friend list had been clicked, we go to his profile
      this.$router.push({ name: 'user-profile', params: { pseudo: friend.userPseudo.toString().toLowerCase() } })
    },

    /* ============ NOTIFICATIONS & FOLLOW ============ */
    async follow () {
      let body = {
        userId: this.user.userId, // The user that will receive the invitation
        userIdHaveFriend: store.getters.getUser.userId,
        isfriendState: 'waiting'
      }
      this.relationWithUser = await _service.isfriend.create(body)
      this.changeBtnContent()
    },
    async unfollow () {
      let body = {
        userId: this.user.userId, // The user that is wanted to be unfollowed
        userIdHaveFriend: store.getters.getUser.userId, // Active user
      }
      let deleted = await _service.isfriend.delete(body)
      if (this.relationWithUser === 'friend' && deleted) {
        let bodyInverse = {
          userId: body.userIdHaveFriend,
          userIdHaveFriend: body.userId
        }
        deleted = await _service.isfriend.delete(bodyInverse)
      }
      if (deleted) {
        this.relationWithUser = 'not-friend'
      }
      await this.loadFriends()
      this.changeBtnContent()
    },
    async acceptInvitation (userId) {
      // Accept this invitation of the displayed profile
      this.isLoading = true
      let bodyInverse = {
        userId: store.getters.getUser.userId, // User active
        userIdHaveFriend: userId, // The user that wants to be friend
        isfriendState: 'friend'
      }
      let accepted = await _service.isfriend.update(bodyInverse)
      if (accepted) {
        let body = {
          userId: bodyInverse.userIdHaveFriend, // The user that wants to be friend
          userIdHaveFriend: bodyInverse.userId, // Active user
          isfriendState: 'friend'
        }
        await _service.isfriend.create(body)
      }
      await this.loadAllInvitations()
      await this.loadFriends()
      this.isLoading = false
    },
    async refuseInvitation (userId) {
      let bodyInverse = {
        userId: store.getters.getUser.userId, // Active user
        userIdHaveFriend: userId, // The user clicked
      }
      await _service.isfriend.delete(bodyInverse)
      await this.loadAllInvitations()
      await this.loadFriends()
    },
  },
  computed: {
    isViewPublic () {
      return this.relationWithUser === 'friend' || this.relationWithUser === 'me'
    }
  },
  watch: {
    '$route': 'loadData'
  }
}
