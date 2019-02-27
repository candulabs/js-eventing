/* global describe, expect, jest, it */
import { BASE_URL, EVENT_API } from 'global-constants';
import { makeAJAXRequest } from 'utils';

describe('makeAJAXRequest', () => {
  let xhr;
  let open;
  let onSuccess;
  let params;
  let send;

  const jsonResponse = { message: 'Im an object' };
  const queryStringBody = { some: 'body' };

  const clientToken = 'whatakey';
  const createXHRmock = (response = {}) => {
    open = jest.fn();
    send = jest.fn();
    onSuccess = jest.fn();
    params = {
      method: 'GET',
      url: BASE_URL,
      queryStringBody,
      onSuccess,
      clientToken,
    };

    const xhrMockClass = () => {
      xhr = Object.assign(response, { open, send });
      return xhr;
    };
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
  };

  describe('it should call the request object with the right methods', () => {
    beforeEach(() => {
      createXHRmock(clientToken);
      makeAJAXRequest(params);
    });
    it('should have called the open function', () => {
      expect(open).toBeCalledWith(
        params.method,
        `${params.url}${EVENT_API}?token=${clientToken}&blob=eyJzb21lIjoiYm9keSJ9`,
      );
    });
    it('should have called the send function', () => {
      expect(send).toBeCalled();
    });
    it('should have set the onload function', () => {
      expect(xhr.onload).not.toBeNull();
    });
    it('should have not called the onSuccess function', () => {
      expect(onSuccess).not.toBeCalled();
    });
  });

  describe('when the request returns status 400', () => {
    beforeEach(() => {
      createXHRmock({ status: 400 });
      makeAJAXRequest(params).catch(() => {});
      xhr.onload();
    });
    it('should have not called the onSuccess function', () => {
      expect(onSuccess).not.toBeCalled();
    });
  });

  describe('when the request returns status 200 and a JSON obj', () => {
    beforeEach(() => {
      createXHRmock({ status: 200, response: JSON.stringify(jsonResponse) });
      makeAJAXRequest(params).then(onSuccess);
      xhr.onload();
    });
    it('should have called the onSuccess function with the correct response', () => {
      expect(onSuccess).toBeCalledWith(jsonResponse);
    });
  });

  describe('when we send an api key', () => {
    beforeEach(() => {
      createXHRmock({ status: 200, response: '{}' }, clientToken);
      makeAJAXRequest(params);
      xhr.onload();
    });
    it('should not have called the onSuccess function', () => {
      expect(onSuccess).not.toBeCalled();
    });
    it('should have appended the key to the url', () => {
      expect(open).toBeCalledWith(
        params.method,
        `${params.url}${EVENT_API}?token=${clientToken}&blob=eyJzb21lIjoiYm9keSJ9`,
      );
    });
  });
});
