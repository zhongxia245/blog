export const ACTION_GET_ALL_ISSUE = 'ACTION_GET_ALL_ISSUE';
export const ACTION_GET_ISSUE_BY_ID = 'ACTION_GET_ISSUE_BY_ID';

export const actionAddItem = (payload: any) => {
  return {
    type: ACTION_GET_ALL_ISSUE,
    payload: payload,
  };
};

export const actionDeleteItme = (payload: any) => {
  return {
    type: ACTION_GET_ISSUE_BY_ID,
    payload: payload,
  };
};
