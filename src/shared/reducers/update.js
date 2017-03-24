import {
  UPDATE_AVAILABLE,
  UPDATE_INSTALL,
} from '../actions/types';

const initialState = {
  installing: false,
  available: false,
  version: null,
  notes: null
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AVAILABLE:
      return {
        ...state,
        available: true,
        version: action.payload.releaseName,
        notes: action.payload.releaseNotes
      };
    case UPDATE_INSTALL:
      return {
        ...state,
        installing: true
      };
    default:
      return state;
  }
}
