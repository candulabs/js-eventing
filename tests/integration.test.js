import eventing from '../app';
import { eventName, properties, userId } from '../app/tests/fixtures';

const clientToken = '';
const url = 'http://localhost:9000';
const NO_CONTENT = 204;

// TODO(michele): turn this into a script
xdescribe('eventing integration testing', () => {
  const requests = eventing(clientToken, userId, url);

  describe('Event', () => {
    it('should reply with 201 without properties', () =>
      requests.track(eventName).then((response) => expect(response).toEqual(NO_CONTENT)));

    it('should reply with 201 with properties', () =>
      requests
        .track(eventName, properties)
        .then((response) => expect(response).toEqual(NO_CONTENT)));

    it('should reply with 201 with properties', () =>
      requests
        .track(eventName, properties)
        .then(expect('should have failed').toEqual('this test'))
        .catch(() => expect(true).toEqual(true)));
  });
});
