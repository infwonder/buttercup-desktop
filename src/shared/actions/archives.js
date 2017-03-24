import { createAction } from 'redux-actions';
import { ARCHIVES_ADD, ARCHIVES_REMOVE, ARCHIVES_SET_CURRENT } from './types';

export const addArchive = (id, type, credentials, path) => ({
  type: ARCHIVES_ADD,
  payload: {
    id,
    type,
    credentials,
    path
  }
});

export const setCurrentArchive = createAction(ARCHIVES_SET_CURRENT);
export const removeArchive = createAction(ARCHIVES_REMOVE);
