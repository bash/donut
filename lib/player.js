import { Emitter } from './emitter'
import { Communicator } from './communicator'

/**
 * @todo Emit some important events from the player
 */
export class Player extends Emitter {
  /**
   *
   * @param {string} appId
   */
  constructor (appId) {
    super()

    /**
     *
     * @type {Communicator}
     * @private
     */
    this._communicator = new Communicator(appId)
  }

  /**
   * @returns {Promise<Player>}
   */
  loaded () {
    return this._communicator
      .once('loaded')
      .then(() => this)
  }

  /**
   *
   * @param {number} albumId
   * @param {number} index
   * @param {boolean} [autoplay]
   * @param {number} [offset]
   *
   * @returns {Promise}
   */
  playAlbum (albumId, { index = 0, autoplay = true, offset = 0 } = {}) {
    this._communicator.sendMethod('DZ.player_controler.playAlbum', {
      album_id: albumId,
      index,
      autoplay,
      offset
    })

    return this._communicator.once(autoplay ? 'play' : 'tracksLoaded')
  }

  /**
   *
   * @returns {Promise}
   */
  play () {
    this._communicator.sendCommand('play')

    return this._communicator.once('play')
  }

  /**
   *
   * @returns {Promise}
   */
  pause () {
    this._communicator.sendCommand('pause')

    return this._communicator.once('pause')
  }
}
