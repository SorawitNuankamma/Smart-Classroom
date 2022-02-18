export const setCurrentMenu = (menu) => {
  return {
    type: "SET_CURRENT_MENU",
    payload: menu,
  };
};

export const setCurrentOperation = (operation) => {
  return {
    type: "SET_CURRENT_OPERATION",
    payload: operation,
  };
};

export const setCurrentAlert = (alert) => {
  return {
    type: "SET_CURRENT_ALERT",
    payload: alert,
  };
};

export const setCurrentLoginTo = (route) => {
  return {
    type: "SET_CURRENT_LOGIN_TO",
    payload: route,
  };
};
