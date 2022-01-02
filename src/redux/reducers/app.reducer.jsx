const INITIAL_STATE = {
  currentMenu: "home",
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_MENU":
      return {
        ...state,
        currentMenu: action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
