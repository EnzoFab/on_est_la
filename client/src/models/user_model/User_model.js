/* eslint-disable */

import {Model} from 'vue-mc'

/**
 * User model
 */
export default class User extends Model {
  // Default attributes that define the "empty" state.
  defaults () {
    return {
      userId: '',
      userFirstname: '',
      userName: '',
      userDateInscription: '',
      userPass: '',
      userToken: 'onestlahein',
      userMail: '',
      userPhone: '',
      userPseudo: '',
      userDescription: '',
      userVisibility: 'public',
      userPicture: '',
      userAccountState: ''
    }
  }

  // Attribute mutations.
  mutations () {
    return {
      userId:   (id) => Number(id) || null,
      userFirstname: String,
      userName: String,
      userDateInscription: String,
      userPass: String,
      userToken: String,
      userMail: String,
      userPhone: String,
      userPseudo: String,
      userDescription: String,
      userVisibility: String,
      userPicture: String,
      userAccountState: String
    }
  }

  // Attribute validation
  validation () {
    return {
      userId: integer.and(min(1)).or(equal(null)),
      userFirstname: String.and(required),
      userName: String.and(required),
      userDateInscription: String,
      userPass: String.and(required).and(length>5),
      userToken: String,
      userMail: String.and(required),
      userPhone: String.and(length=10),
      userPseudo: String.and(required),
      userDescription: String.and(length<200),
      userVisibility: String,
      userPicture: String,
      userAccountState: String
    }
  }

  // Route configuration
  routes () {
    return {
      fetch: '/user/{id}',
      save:  '/user/create',
    }
  }
}
