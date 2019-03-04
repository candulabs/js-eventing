import { EVENT_TYPES, EVENT_SOURCES } from 'global-constants';

import event from './event';
import { makeAJAXRequest } from './utils';

export default (clientToken, userId, url) => {
  const eventingRequest = (queryStringBody) =>
    makeAJAXRequest({ clientToken, queryStringBody, url });

  return {
    identify: (identifyUserId, traits) =>
      eventingRequest(event(identifyUserId, EVENT_TYPES.Identify, { traits })),

    learningPage: (pageName, properties) =>
      eventingRequest(
        event(userId, EVENT_TYPES.Page, {
          source: EVENT_SOURCES.Learning,
          pageName,
          properties,
        }),
      ),

    learningTrack: (eventName, properties) =>
      eventingRequest(
        event(userId, EVENT_TYPES.Track, {
          source: EVENT_SOURCES.Learning,
          eventName,
          properties,
        }),
      ),

    page: (pageName, properties) =>
      eventingRequest(event(userId, EVENT_TYPES.Page, { pageName, properties })),

    player: (playerAction, learningScript, properties) =>
      eventingRequest(
        event(userId, EVENT_TYPES.Track, {
          source: EVENT_SOURCES.Player,
          eventName: playerAction,
          // we rewrite here because learning script comes with additional properties we don't want to send over the wire
          learningScript: learningScript && {
            learningObjectiveId: learningScript.learningObjectiveId,
            learningObjectiveVersionId: learningScript.learningObjectiveVersionId,
            learningMaterialId: learningScript.learningMaterialId,
            learningMaterialVersionId: learningScript.learningMaterialVersionId,
          },
          properties,
        }),
      ),

    track: (eventName, properties) =>
      eventingRequest(event(userId, EVENT_TYPES.Track, { eventName, properties })),
  };
};
