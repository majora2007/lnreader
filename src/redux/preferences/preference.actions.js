import {SAVE_SCROLL_POSITION} from '../preferences/preference.types';

export const saveScrollPosition =
  (position, percentage, chapterId, novelId) => async dispatch => {
    dispatch({
      type: SAVE_SCROLL_POSITION,
      payload: {
        position,
        percentage,
        chapterId,
        novelId,
      },
    });
  };
