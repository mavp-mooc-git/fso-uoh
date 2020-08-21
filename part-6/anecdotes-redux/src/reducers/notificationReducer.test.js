import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notification Reducer', () => {
  const action = {
    type: 'OTHER'
  }
  const initialState = notificationReducer(undefined, action)

  // eslint-disable-next-line no-multi-str
  test('should return a proper initial state when\
  called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('message new anecdote is added', () => {
    const action = {
      type: 'NEW_MSG',
      data: 'new anecdote is added to initial state'
    }
    
    const state = initialState
    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toEqual(action.data)
  })

})
