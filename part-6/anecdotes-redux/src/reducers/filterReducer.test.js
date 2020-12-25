import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('filter Reducer', () => {
  const action = {
    type: 'OTHER'
  }
  const initialState = filterReducer(undefined, action)

  // eslint-disable-next-line no-multi-str
  test('should return a proper initial state when\
  called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = filterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('SET_FILTER returns right state', () => {
    const action = {
      type: 'SET_FILTER',
      filter: 'new'
    }
    
    const state = initialState
    deepFreeze(state)
    const newState = filterReducer(state, action)
    expect(newState).toEqual(action.filter)
  })

  test('Other actions return an empty state', () => {
    const action = {
      type: 'OTHER',
      filter: 'another text'
    }
    
    const state = initialState
    deepFreeze(state)
    const newState = filterReducer(state, action)
    expect(newState).toEqual(state)
  })

})
