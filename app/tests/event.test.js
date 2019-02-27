import { clientLibrary, EVENT_SOURCES } from 'global-constants';
import event from '../event';
import {
  eventName,
  eventType,
  learningScript,
  pageName,
  playerAction,
  properties,
  traits,
  userId,
} from './fixtures';

describe('When creating an event', () => {
  beforeEach(() => {
    window.localStorage = {};
    window.localStorage.setItem = jest.fn();
    window.localStorage.getItem = jest.fn();
  });
  it('should have an id in the form of a UUId', () => {
    expect(event().id).toBeDefined();
  });
  it('should define a anonymousId ', () => {
    expect(event().anonymousId).toBeDefined();
  });
  it('should define a userId correctly', () => {
    expect(event(userId).userId).toEqual(userId.toString());
  });
  it('should define a event type', () => {
    expect(event(userId, eventType).type).toEqual(eventType);
  });
  it('should define properties', () => {
    expect(event(userId, eventType, { properties }).properties).toEqual(properties);
  });
  it('should define traits', () => {
    expect(event(userId, eventType, { properties, traits }).traits).toEqual(traits);
    expect(event(userId, eventType, { traits }).traits).toEqual(traits);
  });
  it('should define a locale', () => {
    expect(event().context.locale).toEqual(navigator.language);
  });
  it('should have screen defined with the right properties', () => {
    expect(event().context.screen).toEqual({ width: 0, height: 0 });
  });
  it('should define page', () => {
    expect(event().context.page).toEqual({
      path: window.location.pathname,
      url: window.location.href,
      title: document.title,
      search: window.location.search,
      referrer: document.referrer,
    });
  });
  it('should define a user agent', () => {
    expect(event().context.userAgent).toEqual(navigator.userAgent);
  });
  it('should define the library', () => {
    expect(event().context.library).toEqual(clientLibrary);
  });
  it('should define the timezone', () => {
    expect(event().context.timezone).toEqual(Intl.DateTimeFormat().resolvedOptions().timeZone);
  });
  it('should include a sentAt date', () => {
    expect(event().sentAt).toBeDefined();
  });
  it('should include an eventName when we define one', () => {
    expect(event(userId, eventType, { eventName, properties, traits }).eventName).toBe(eventName);
  });
  it('should include an pageName when we define one', () => {
    expect(event(userId, eventType, { pageName, properties, traits }).pageName).toBe(pageName);
  });
  it('should include a playerAction when we define one', () => {
    expect(event(userId, eventType, { playerAction, properties, traits }).playerAction).toBe(
      playerAction,
    );
  });
  it('should include a learningScript when we define one', () => {
    expect(
      event(userId, eventType, { playerAction, properties, learningScript }).learningScript,
    ).toBe(learningScript);
  });
  it('should send source when we specify it', () => {
    expect(
      event(userId, eventType, { source: EVENT_SOURCES.Learning, properties, learningScript })
        .context.source,
    ).toBe(EVENT_SOURCES.Learning);
  });
});
