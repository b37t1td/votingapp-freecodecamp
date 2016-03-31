export default class Actions {

  static setUser(user = {}) {
    return {
      type : 'SET_USER',
      payload : user
    }
  }

  static setLoading(loading = false) {
    return {
      type : 'LOADING',
      payload: loading
    }
  }

  static loadPoll(data) {
    return {
      type : 'LOAD_POLL',
      payload : data
    }
  }

  static addPoll(data) {
    return {
      type : 'ADD_POLL',
      payload : data
    }
  }

  static clearPolls() {
    return {
      type : 'CLEAR_POLLS',
      payload : null
    }
  }
}
