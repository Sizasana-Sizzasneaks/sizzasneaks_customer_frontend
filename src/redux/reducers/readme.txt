This folder contains the logical code for the reducers used by the SIZZASNEAKS platform. The reducers are combined into a single reducer.

The reducers are used to handle actions that take place within the application. They also take the previous or old state of the application and return a new state.

The following is a breakdown of all the this folders contents:-
----------------------------------------------------------------------------------------------------------
src\redux\reducers\index.js

This file contains the reducers being combined into a a bundle. It includes specifically, the firebase reducer that updates the state for Firestore where authentication occurs.
