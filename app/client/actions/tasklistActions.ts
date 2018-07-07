import * as constants from '../constants';

export const receiveNewTasklist = (entity: any) {
  return {
    type: constants.TASKLIST_CREATE_SUCCESS,
    payload: {
      entity
    }
  }
}