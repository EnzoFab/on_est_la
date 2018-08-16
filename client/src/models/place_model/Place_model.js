/* eslint-disable */

import {Model} from 'vue-mc'

/**
 * User model
 */
export default class Place extends Model {
  // Default attributes that define the "empty" state.
  defaults () {
    return {
      placeId: null,
      placeName: null,
      placeDescription: null,
      placeAdressNum: null,
      placeAdressStreet: null,
      placeAdressPostalCode: null,
      placeAdressPostalCity: null,
      placeAdressPostalCountry: null,
      placeAdressPostalDetails: null
    }
  }

  // Attribute mutations.
  mutations () {
    return {
      placeId:   (id) => Number(id) || null,
      placeName: String,
      placeDescription: String,
      placeAdressNum: Date,
      placeAdressStreet: String,
      placeAdressCode: String,
      placeAdressCity: String,
      placeAdressCountry: String,
      placeAdressDetails: String,
    }
  }

  // Attribute validation
  validation () {
    return {
      placeId: integer.and(min(1)).or(equal(null)),
      placeName: String.and(required),
      placeDescription: String.and(required),
      placeAdressNum: String.and(required),
      placeAdressStreet: String.and(required),
      placeAdressCode: String.and(length=5),
      placeAdressCity: String.and(required),
      placeAdressCountry: String.and(required),
      placeAdressDetails: String

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
