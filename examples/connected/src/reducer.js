export const SAVE_USER = "SAVE_USER";

export default (state = { username: "" }, action) => {
  switch (action.type) {
    case SAVE_USER:
      return { ...state, username: action.payload };
    default:
      return state;
  }
};
