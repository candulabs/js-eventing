import { EVENT_API, EVENT_URL } from 'global-constants';
import { Base64 } from 'js-base64';
/**
 * Utility function to get timestamps and mock it in other tests
 */
export const timestamp = () => new Date().getTime();

/**
 * We create our implemetation of a JSON AJAX request to avoid
 * incorporating external libraries that we don't need.
 * @param {string} clientToken the api key we use to make the request.
 * @param {object} body optional json body to be send.
 */
export const makeAJAXRequest = ({ clientToken, queryStringBody, url }) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const blob = Base64.encode(JSON.stringify(queryStringBody));
    const devUrl = url && `${url}${EVENT_API}`;
    let urlForRequest = `${devUrl || EVENT_URL}?token=${clientToken}`;
    if (blob) {
      urlForRequest = `${urlForRequest}&blob=${blob}`;
    }
    xhr.open('GET', urlForRequest);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else if (xhr.status === 204) {
        resolve();
      } else {
        reject();
      }
    };
    xhr.send();
  });

export default makeAJAXRequest;
