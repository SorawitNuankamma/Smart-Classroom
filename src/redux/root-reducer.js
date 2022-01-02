import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./reducers/user.reducer";
import appReducer from "./reducers/app.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "app"],
};

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
});

export default persistReducer(persistConfig, rootReducer);
