export default {
  blockFieldSize (value, size) {
    let answer = ''
    if (value !== null) {
      if (value.length >= size) {
        answer = value.substring(0, size)
        answer += '...'
      } else {
        answer = value
      }
    }
    return answer
  }
}
