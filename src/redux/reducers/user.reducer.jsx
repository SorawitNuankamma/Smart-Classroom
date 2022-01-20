const INITIAL_STATE = {
  currentUser: "none",
  currentClassroomRole: "none",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_CURRENT_CLASSROOM_ROLE":
      return {
        ...state,
        currentClassroomRole: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
