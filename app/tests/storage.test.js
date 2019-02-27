import { ANONYMOUS_ID_STORAGE_KEY } from 'global-constants';

import storage from '../storage';

describe('Storage', () => {
  let value;

  beforeEach(() => {
    window.localStorage = {};
  });
  describe('it should have the correct methods defined', () => {
    it('should define getOrCreate for anonymousId', () => {
      expect(storage.anonymousId.getOrCreate).toBeDefined();
    });
    it('should define set for anonymousId', () => {
      expect(storage.anonymousId.set).toBeDefined();
    });
  });
  describe('when getOrCreate on empty storage', () => {
    beforeEach(() => {
      window.localStorage.getItem = jest.fn();
      window.localStorage.setItem = jest.fn();
      value = storage.anonymousId.getOrCreate();
    });
    it('should return some new value', () => {
      expect(value).toBeDefined();
      expect(value.length).toEqual(36); // yeah, it's a UUID
    });
    it('should have called the get function once', () => {
      expect(window.localStorage.getItem.mock.calls[0]).toEqual([ANONYMOUS_ID_STORAGE_KEY]);
    });
    it('should have called the set function once', () => {
      expect(window.localStorage.setItem.mock.calls[0]).toEqual([
        ANONYMOUS_ID_STORAGE_KEY,
        JSON.stringify(value),
      ]);
    });
  });

  describe('when getOrCreate and get is avaliable', () => {
    const someId = '3910';

    beforeEach(() => {
      window.localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify(someId));
      window.localStorage.setItem = jest.fn();
      value = storage.anonymousId.getOrCreate();
    });
    it('should return the get value', () => {
      expect(value).toEqual(someId);
    });
    it('should have called the get function once', () => {
      expect(window.localStorage.getItem.mock.calls[0]).toEqual([ANONYMOUS_ID_STORAGE_KEY]);
    });
    it('should have not called the set', () => {
      expect(window.localStorage.setItem).not.toHaveBeenCalled();
    });
  });
});
