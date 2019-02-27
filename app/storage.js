import uuid from 'uuid/v4';
import { ANONYMOUS_ID_STORAGE_KEY } from 'global-constants';

const hasStorage = () => window && window.localStorage;

const get = (key) => () => {
  if (hasStorage()) {
    const value = window.localStorage.getItem(key);
    if (value) {
      try {
        // fail gracefully in case a customer tampered with the localStorage
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }
  }
  return undefined;
};

const getOrCreate = (key, createFn) => () => get(key)() || createFn();

const set = (key) => (value) => {
  if (hasStorage() && value !== null && value !== undefined) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export default {
  anonymousId: {
    getOrCreate: getOrCreate(ANONYMOUS_ID_STORAGE_KEY, () => {
      const id = uuid();
      set(ANONYMOUS_ID_STORAGE_KEY)(id);
      return id;
    }),
    set: set(ANONYMOUS_ID_STORAGE_KEY),
  },
};
