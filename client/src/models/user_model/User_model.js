/* eslint-disable */

import {Model} from 'vue-mc'

/**
 * User model
 */
export class User extends Model {
  // Default attributes that define the "empty" state.
  defaults () {
    return {
      userId: null,
      userFirstname: null,
      userName: null,
      userDateInscription: null,
      userMail: null,
      userPhone: null,
      userPseudo: null,
      userDescription: null,
      userVisibility: null,
      userPicture: null
    }
  }

  // Attribute mutations.
  mutations () {
    return {
      userId:   (id) => Number(id) || null,
      userFirstname: String,
      userName: String,
      userDateInscription: Date,
      userMail: String,
      userPhone: String,
      userPseudo: String,
      userDescription: String,
      userVisibility: String,
      userPicture: String
    }
  }

  // Attribute validation
  validation () {
    return {
      userId: integer.and(min(1)).or(equal(null)),
      userFirstname: String.and(required),
      userName: String.and(required),
      userDateInscription: Date,
      userMail: String,
      userPhone: String.and(length=10),
      userPseudo: String,
      userDescription: String.and(length<200),
      userVisibility: String,
      userPicture: String
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
