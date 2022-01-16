const INITIAL_STATE = {
  currentMenu: "home",
  currentOperation: "none",
  currentAlert: null,
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_MENU":
      return {
        ...state,
        currentMenu: action.payload,
      };
    case "SET_CURRENT_OPERATION":
      return {
        ...state,
        currentOperation: action.payload,
      };
    case "SET_CURRENT_ALERT":
      return {
        ...state,
        currentAlert: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
