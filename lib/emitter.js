export class Emitter {
  constructor () {
    /**
     *
     * @type {Map}
     */
    this._events = new Map()
  }

  /**
   *
   * @param {string} name
   * @param {Function} callbackFn
   */
  on (name, callbackFn) {
    let listeners = this._events.get(name)

    if (!listeners) {
      listeners = new Set()
      this._events.set(name, listeners)
    }

    listeners.add(callbackFn)
  }

  /**
   *
   * @param {string} name
   * @param {Function} callbackFn
   */
  off (name, callbackFn) {
    if (!this._events.get(name)) {
      return
    }

    this._events.get(name).delete(callbackFn)
  }

  /**
   *
   * @param {string} name
   * @returns {Promise<*>}
   */
  once (name) {
    return new Promise((resolve) => {
      const handler = (data) => {
        this.off(name, handler)

        resolve(data)
      }

      this.on(name, handler)
    })
  }

  /**
   *
   * @param {string} name
   * @param {*} [data]
   */
  emit (name, data) {
    if (!this._events.get(name)) {
      return
    }

    this._events.get(name).forEach((fn) => fn(data))
  }
}
