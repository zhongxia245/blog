import { ACTION_GET_ALL_ISSUE, ACTION_GET_ISSUE_BY_ID } from './action';

export default function reducer(state: any, action: any) {
  const { payload, type } = action;

  switch (type) {
    case ACTION_GET_ALL_ISSUE:
      state.list.push(payload);
      return { ...state };
    case ACTION_GET_ISSUE_BY_ID:
      state.list.splice(payload, 1);
      return { ...state };
    default:
      // tslint:disable-next-line: no-console
      console.log(`[WARN]:找不到类型 ${type} 的处理方式`);
      return state;
  }
}
