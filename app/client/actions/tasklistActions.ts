import * as constants from '../constants';

export const fetchTasklists = () => {
  return {
    type: constants.TASKLISTS_FETCH,
    payload: {}
  }
}

export const receiveTasklists = () => {
  return {
    type: constants.TASKLISTS_FETCH_SUCCESS,
    payload: {}
  }
}

export const receiveNewTasklist = (entity: any) => {
  return {
    type: constants.TASKLIST_CREATE_SUCCESS,
    payload: {
      entity
    }
  }
}