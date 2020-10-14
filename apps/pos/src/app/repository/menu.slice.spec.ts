import { fetchMenu, menuAdapter, menuReducer } from './menu.slice';

describe('menu reducer', () => {
  it('should handle initial state', () => {
    const expected = menuAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(menuReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchMenus', () => {
    let state = menuReducer(undefined, fetchMenu.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = menuReducer(state, fetchMenu.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = menuReducer(
      state,
      fetchMenu.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
