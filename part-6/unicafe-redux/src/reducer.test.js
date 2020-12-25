import counterReducer from './reducer'
import deepFreeze from 'deep-freeze'

describe('unicafe Reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when\
  called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good action is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok action is incremented', () => {
    const action = {
      type: 'OK'
    }
    
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad action is incremented', () => {
    const action = {
      type: 'BAD'
    }
    
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('zero action resets state to initialState', () => {
    const action = {
      type: 'ZERO'
    }
    
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })

  test('others action is current state', () => {
    const previousState = {
      good: 5,
      ok: 3,
      bad: 2
    }

    const action = {
      type: 'OTHERS'
    }

    const state = previousState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(previousState)
    expect(state).toEqual({
      good: 5,
      ok: 3,
      bad: 2
    })
  })

})
