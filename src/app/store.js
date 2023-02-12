import { configureStore } from '@reduxjs/toolkit';
// import apartments from '../features/apartments-list/apartmentsListSlice';
import filters from '../features/apartments-filter/apartmentsFiltersSlice';
import { apiSlice } from '../features/api/apiSlice';

// // loading state form localStorage if it's not empty
// function loadFromLocalStorage() {
//   try {
//     const serialisedState = localStorage.getItem("persistantState");
//     if (serialisedState === null) return undefined;
//     return JSON.parse(serialisedState);
//   } catch (e) {
//     console.warn(e);
//     return undefined;
//   }
// }

// // convert object to string and store in localStorage
// function saveToLocalStorage(state) {
//   try {
//     const serialisedState = JSON.stringify(state);
//     localStorage.setItem("persistantState", serialisedState);
//   } catch (e) {
//     console.warn(e);
//   }
// }

export const store = configureStore({
  reducer: { filters, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  // preloadedState: loadFromLocalStorage(),
  devTools: process.env.NODE_ENV !== 'production'
});

// store.subscribe(() => saveToLocalStorage(store.getState()));
