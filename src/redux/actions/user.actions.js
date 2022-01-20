export const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENT_USER",
    payload: user,
  };
};

export const setCurrentClassroomRole = (role) => {
  return {
    type: "SET_CURRENT_CLASSROOM_ROLE",
    payload: role,
  };
};
