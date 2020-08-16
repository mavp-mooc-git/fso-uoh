import reducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdotes Reducer', () => {
  const initialState = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  // eslint-disable-next-line no-multi-str
  test('should return a proper initial state when\
  called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const aux = reducer(undefined, action)
    const newState = aux.map(a => a.content)
    expect(newState).toEqual(initialState)
  })

  test('new anecdote is added', () => {
    const action = {
      type: 'NEW_ANECDOTE',
      data: 'new anecdote is added to initial state'
    }
    
    const state = initialState

    deepFreeze(state)
    const aux = reducer(state, action)
    const anecdoteToChange = aux.find(a => a.content === action.data)
    const newState = [...state, anecdoteToChange.content]
    expect(newState).toHaveLength(7)
    expect(newState).toContainEqual(action.data)
  })

  test('new vote is incremented', () => {
    const action1 = {
      type: 'NEW_ANECDOTE',
      data: 'new anecdote is added to initial state'
    }

    const state = initialState

    deepFreeze(state)
    const aux = reducer(state, action1)
    const newAnecdote = aux.find(a => a.content === action1.data)

    const action2 = {
      type: 'VOTE',
      data: newAnecdote.id
    }
    
    const newState = reducer(aux, action2)
    expect(newState).toHaveLength(7)
    expect(newState[6].votes).toEqual(1)
  })

})
