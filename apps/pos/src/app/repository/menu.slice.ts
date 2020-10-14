import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const MENU_FEATURE_KEY = 'menu';

/*
 * Update these interfaces according to your requirements.
 */
export interface MenuEntity {
  id: number;
  description: string;
}

export interface MenuState extends EntityState<MenuEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const menuAdapter = createEntityAdapter<MenuEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchMenu())
 * }, [dispatch]);
 * ```
 */
export const fetchMenu = createAsyncThunk(
  'menu/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getMenus()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialMenuState: MenuState = menuAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const menuSlice = createSlice({
  name: MENU_FEATURE_KEY,
  initialState: initialMenuState,
  reducers: {
    add: menuAdapter.addOne,
    remove: menuAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state: MenuState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchMenu.fulfilled,
        (state: MenuState, action: PayloadAction<MenuEntity[]>) => {
          menuAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchMenu.rejected, (state: MenuState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const menuReducer = menuSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(menuActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const menuActions = menuSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllMenu);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = menuAdapter.getSelectors();

export const getMenuState = (rootState: unknown): MenuState =>
  rootState[MENU_FEATURE_KEY];

export const selectAllMenu = createSelector(getMenuState, selectAll);

export const selectMenuEntities = createSelector(getMenuState, selectEntities);
