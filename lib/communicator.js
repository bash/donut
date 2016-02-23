import { Emitter } from './emitter'
import { ORIGIN, PLAYER_URL, METHODS_TO_EVENTS, EVENTS_MAP } from './constants'

/**
 * @param {Array<Array<string>>} params
 * @returns {string}
 */
function buildQuery (params) {
  return params
    .map((pair) => pair.map(encodeURIComponent).join('='))
    .join('&')
}

/**
 *
 * @param {string} appId
 * @returns {HTMLIFrameElement}
 */
function createFrame (appId) {
  const params = buildQuery([
    [ 'emptyPlayer', 'true' ],
    [ 'channel', '' ],
    [ 'app_id', appId ]
  ])

  const frame = document.body.appendChild(document.createElement('iframe'))

  frame.setAttribute('hidden', '')
  frame.src = `${PLAYER_URL}?${params}`

  return frame
}

/**
 *
 * @param {Communicator} communicator
 * @param {string} eventName
 * @param {*} eventValue
 */
function handleEventMessage (communicator, eventName, eventValue) {
  if (!EVENTS_MAP.has(eventName)) {
    return console.warn(`event ${eventName} not mapped`, eventValue)
  }

  communicator.emit(EVENTS_MAP.get(eventName), eventValue)
}

/**
 *
 * @param {Communicator} communicator
 * @param {string} method
 * @param {*} data
 */
function handleMethodMessage (communicator, method, data) {
  if (!METHODS_TO_EVENTS.has(method)) {
    return console.warn(`method ${method} not mapped to an event`, data)
  }

  communicator.emit(METHODS_TO_EVENTS.get(method), data.args)
}

/**
 *
 * @param {Communicator} communicator
 * @param {MessageEvent} message
 */
function handleMessage (communicator, message) {
  let data

  if (message.origin !== ORIGIN) {
    return
  }

  try {
    data = JSON.parse(message.data)
  } catch (_) {
    return console.error('could not parse json response from deezer')
  }

  if (data.method === 'DZ.player.receiveEvent') {
    return handleEventMessage(communicator, data.args.evt, data.args.val)
  }

  handleMethodMessage(communicator, data.method, data)
}

export class Communicator extends Emitter {
  /**
   *
   * @param {string} appId
   */
  constructor (appId) {
    super()

    /**
     *
     * @type {HTMLIFrameElement}
     * @private
     */
    this._frame = createFrame(appId)

    window.addEventListener('message', (msg) => handleMessage(this, msg))
  }

  /**
   *
   * @param {string} method
   * @param {{}} args
   */
  sendMethod (method, args) {
    const data = { method, args }

    this._frame.contentWindow.postMessage(JSON.stringify(data), '*')
  }

  /**
   *
   * @param {string} command
   */
  sendCommand (command) {
    this.sendMethod('DZ.player_controler.doAction', { command })
  }
}
