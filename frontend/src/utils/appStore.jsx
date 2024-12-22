// 1:- Create store
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.jsx";
import feedReducer from "./feedSlice.jsx";
import connectionReducer from "./connectionSlice.jsx";
import requestReducer from "./requestSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});
export default appStore;
