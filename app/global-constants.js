/* global __BASE_URL__, __VERSION__ */
export const BASE_URL = __BASE_URL__;

export const FILTER_TYPES = {
  Include: 'Include',
  Exclude: 'Exclude',
};

export const EVENT_API = '/api/events';

export const EVENT_URL = `${BASE_URL}${EVENT_API}`;

export const EVENT_TYPES = {
  Identify: 'Identify',
  Page: 'Page',
  Track: 'Track',
};

export const EVENT_SOURCES = {
  Player: 'Player',
  Learning: 'Learning',
};

export const PLAYER_ACTIONS = {
  Close: 'Close',
  Dismiss: 'Dismiss',
  Ended: 'Ended',
  Mute: 'Mute',
  Unmute: 'Unmute',
  Open: 'Open',
  Pause: 'Pause',
  Play: 'Play',
};

export const clientLibrary = {
  name: 'JsClient',
  version: __VERSION__,
};

/**
 * Storage keys used for
 */
export const ANONYMOUS_ID_STORAGE_KEY = 'candu:anonymous_id';
