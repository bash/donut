/**
 *
 * @type {string}
 */
export const ORIGIN = 'https://www.deezer.com'

/**
 *
 * @type {string}
 */
export const PLAYER_URL = `${ORIGIN}/plugins/player.php`

/**
 *
 * @type {Map}
 */
export const METHODS_TO_EVENTS = new Map([
  [ 'DZ.onDeezerLoaded', 'loaded' ]
])

/**
 *
 * @type {Map}
 */
export const EVENTS_MAP = new Map([
  [ 'PLAY', 'play' ],
  [ 'PAUSED', 'pause' ],
  [ 'TRACKS_LOADED', 'tracksLoaded' ]
])
