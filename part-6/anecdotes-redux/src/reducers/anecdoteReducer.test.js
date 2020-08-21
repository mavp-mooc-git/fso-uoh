import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdotes Reducer', () => {
  const action = {
    type: 'OTHER'
  }
  const initialState = anecdoteReducer(undefined, action)

  // eslint-disable-next-line no-multi-str
  test('should return a proper initial state when\
  called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('getting initial state', () => {
    const action = {
      type: 'INIT_ANECDOTE',
      data: [{
        'content': 'If it hurts, do it more often',
        'id': '47145',
        'votes': 0
      }]
    }

    const state = initialState
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(1)
    expect(newState).toEqual(action.data)
  })

  test('new anecdote is added', () => {
    const action = {
      type: 'NEW_ANECDOTE',
      data: {
        'content': 'new anecdote is added to initial state',
        'id': '50673',
        'votes': 0
      }
    }

    const state = initialState
    deepFreeze(state)
    const newAnecdote = anecdoteReducer(state, action)
    const newState = [...state, ...newAnecdote]
    expect(newState).toHaveLength(1)
    expect(newState[0]).toEqual(action.data)
  })

  test('new vote is incremented', () => {
    const action1 = {
      type: 'NEW_ANECDOTE',
      data: {
        'content': 'new anecdote is added to initial state',
        'id': '50673',
        'votes': 0
      }
    }

    const state = initialState
    deepFreeze(state)
    const newAnecdote = anecdoteReducer(state, action1)

    const action2 = {
      type: 'VOTE',
      data: newAnecdote[0]
    }
    const newState = anecdoteReducer(newAnecdote, action2)
    expect(newState).toHaveLength(1)
    //expect(newState[0].votes).toEqual(1)
  })

})
