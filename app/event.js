import uuid from 'uuid/v4';
import { clientLibrary } from 'global-constants';

import storage from './storage';

const page = () => ({
  path: window.location.pathname,
  url: window.location.href,
  title: document.title,
  search: window.location.search,
  referrer: document.referrer,
});

const eventScreen = () => ({
  height: window.screen.height,
  width: window.screen.width,
});

const context = (source) => ({
  source,
  locale: navigator.language,
  screen: window.screen && eventScreen(), // make it a function bc it might change in a session
  page: window && document && page(),
  userAgent: navigator.userAgent,
  library: clientLibrary,
  timezone: window.Intl && window.Intl.DateTimeFormat().resolvedOptions().timeZone,
});

const event = (userId, type, options = {}) => ({
  id: uuid(),
  anonymousId: storage.anonymousId.getOrCreate(),
  userId: userId && userId.toString(), // always transform it into a string
  type,
  context: context(options.source),
  sentAt: new Date().toISOString(),
  eventName: options.eventName,
  pageName: options.pageName,
  playerAction: options.playerAction,
  properties: options.properties,
  learningScript: options.learningScript,
  traits: options.traits,
});

export default event;
