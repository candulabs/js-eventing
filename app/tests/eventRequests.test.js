/* global describe, it, beforeEach, expect, window */
import { EVENT_TYPES, EVENT_SOURCES } from 'global-constants';

import {
  eventName,
  learningScript,
  pageName,
  playerAction,
  properties,
  traits,
  userId,
} from './fixtures';

import event from '../event';
import { makeAJAXRequest } from '../utils';
import eventRequests from '../eventRequests';

jest.mock('../event');
jest.mock('../utils');

describe('eventRequests', () => {
  const clientToken = 'someToken';
  const requests = eventRequests(clientToken, userId);
  const promise = { then: () => {} };

  let eventSpy;
  let makeAJAXRequestSpy;
  let response;

  beforeEach(() => {
    makeAJAXRequestSpy = jest.fn().mockImplementation(() => promise);
    makeAJAXRequest.mockImplementation(makeAJAXRequestSpy);
    eventSpy = jest
      .fn()
      .mockImplementation((uid, type, options) => ({ userId: uid, type, options }));
    event.mockImplementation(eventSpy);
    // reset response for other unit test
    response = null;
  });

  describe('Track', () => {
    beforeEach(() => {
      response = requests.track(eventName, properties);
    });
    it('shold have called makeAJAXRequest', () => {
      expect(makeAJAXRequestSpy).toHaveBeenCalled();
    });
    it('should have called event with the right arguments', () => {
      expect(eventSpy).toHaveBeenCalledWith(userId, EVENT_TYPES.Track, {
        eventName,
        properties,
      });
    });
    it('should have a promise as a response', () => {
      expect(response).toEqual(promise);
    });
  });

  describe('Identify', () => {
    beforeEach(() => {
      response = requests.identify(userId, traits);
    });
    it('shold have called makeAJAXRequest', () => {
      expect(makeAJAXRequestSpy).toHaveBeenCalled();
    });
    it('should have called event with the right arguments', () => {
      expect(eventSpy).toHaveBeenCalledWith(userId, EVENT_TYPES.Identify, { traits });
    });
    it('should have a promise as a response', () => {
      expect(response).toEqual(promise);
    });
  });

  describe('Page', () => {
    beforeEach(() => {
      response = requests.page(pageName, properties);
    });
    it('shold have called makeAJAXRequest', () => {
      expect(makeAJAXRequestSpy).toHaveBeenCalled();
    });
    it('should have called event with the right arguments', () => {
      expect(eventSpy).toHaveBeenCalledWith(userId, EVENT_TYPES.Page, { pageName, properties });
    });
    it('should have a promise as a response', () => {
      expect(response).toEqual(promise);
    });
  });

  describe('Player', () => {
    beforeEach(() => {
      response = requests.player(playerAction, learningScript, properties);
    });
    it('shold have called makeAJAXRequest', () => {
      expect(makeAJAXRequestSpy).toHaveBeenCalled();
    });
    it('should have called event with the right arguments', () => {
      expect(eventSpy).toHaveBeenCalledWith(userId, EVENT_TYPES.Track, {
        source: EVENT_SOURCES.Player,
        eventName: playerAction,
        learningScript,
        properties,
      });
    });
    it('should have a promise as a response', () => {
      expect(response).toEqual(promise);
    });
  });

  describe('Learning Page', () => {
    beforeEach(() => {
      response = requests.learningPage(pageName, properties);
    });
    it('shold have called makeAJAXRequest', () => {
      expect(makeAJAXRequestSpy).toHaveBeenCalled();
    });
    it('should have called event with the right arguments', () => {
      expect(eventSpy).toHaveBeenCalledWith(userId, EVENT_TYPES.Page, {
        source: EVENT_SOURCES.Learning,
        pageName,
        properties,
      });
    });
    it('should have a promise as a response', () => {
      expect(response).toEqual(promise);
    });
  });

  describe('Learning Track', () => {
    beforeEach(() => {
      response = requests.learningTrack(eventName, properties);
    });
    it('shold have called makeAJAXRequest', () => {
      expect(makeAJAXRequestSpy).toHaveBeenCalled();
    });
    it('should have called event with the right arguments', () => {
      expect(eventSpy).toHaveBeenCalledWith(userId, EVENT_TYPES.Track, {
        source: EVENT_SOURCES.Learning,
        eventName,
        properties,
      });
    });
    it('should have a promise as a response', () => {
      expect(response).toEqual(promise);
    });
  });
});
