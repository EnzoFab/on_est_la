/* eslint-disable */

import {Model} from 'vue-mc'

/**
 * User model
 */
export class User extends Model {
  // Default attributes that define the "empty" state.
  defaults () {
    return {
      user_id: null,
      user_firstname: null,
      user_name: null,
      user_date_inscription: null,
      user_mail: null,
      user_phone: null,
      user_pseudo: null,
      user_description: null,
      user_visibility: null,
      user_picture: null
    }
  }

  // Attribute mutations.
  mutations () {
    return {
      user_id:   (id) => Number(id) || null,
      user_firstname: String,
      user_name: String,
      user_date_inscription: Date,
      user_mail: String,
      user_phone: String,
      user_pseudo: String,
      user_description: String,
      user_visibility: String,
      user_picture: String
    }
  }

  // Attribute validation
  validation () {
    return {
      user_id: integer.and(min(1)).or(equal(null)),
      user_firstname: String.and(required),
      user_name: String.and(required),
      user_date_inscription: Date,
      user_mail: String,
      user_phone: String.and(length=10),
      user_pseudo: String,
      user_description: String.and(length<200),
      user_visibility: String,
      user_picture: String
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
