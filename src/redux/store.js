import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Slice imports
import authReducer from "./slice/authSlice";
import profileReducer from "./slice/profileSlice";
import homeReducer from "./slice/homeSlice";
import shopDetailReducer from "./slice/shopDetailSlice";
import categoryReducer from "./slice/categorySlice";
import slotReducer from "./slice/slotSlice";
import favouritesReducer from "./slice/favouritesSlice";
import walletReducer from "./slice/walletSlice";
import setBookNowReducer from "./slice/setBookNowSlice";
import allAppointmentsReducer from "./slice/appointmentsSlice";
import paymentReducer from "./slice/paymentSlice";
import reviewReducer from "./slice/reviewSlice";
import notificationReducer from "./slice/notificationSlice";
import deActivateAccountReducer from "./slice/deActivateSlie";
import couponReducer from "./slice/couponSlice";
import searchedListReducer from "./slice/searchedListSlice";

// Only persist `setBookNow`
const setBookNowPersistConfig = {
  key: "setBookNow",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  proile: profileReducer,
  home: homeReducer,
  shopDetail: shopDetailReducer,
  category: categoryReducer,
  availabeSlots: slotReducer,
  favourites: favouritesReducer,
  addWallet: walletReducer,
  setBookNow: persistReducer(setBookNowPersistConfig, setBookNowReducer),
  allAppointments: allAppointmentsReducer,
  wallet: walletReducer,
  paymentsuccess: paymentReducer,
  review: reviewReducer,
  notification: notificationReducer,
  deActivateAccount: deActivateAccountReducer,
  coupon: couponReducer,
  searchedList: searchedListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);
