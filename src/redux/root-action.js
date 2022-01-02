import * as userActions from "./actions/user.actions";
import * as appActions from "./actions/app.actions";

export const actionCreators = {
  ...userActions,
  ...appActions,
};
