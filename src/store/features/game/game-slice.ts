import { createSlice } from '@reduxjs/toolkit'

export type GameState = {
  score: number
  // stores the index of the opened cards
  flippedCards: number[]
}

const initialState: GameState = {
  flippedCards: [],
  score: 0,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    flipCard: (state, action) => {
      // if two cards are opened or a user clicks
      // the same card second time reset the flippedCards array
      if (state.flippedCards.length === 2 || state.flippedCards.includes(action.payload)) {
        state.flippedCards = []
      } else if (state.flippedCards.length < 2) {
        // otherwise push the card index to the flippedCards array
        state.flippedCards.push(action.payload)
      }
    },
  },
})

export const { flipCard } = gameSlice.actions
export default gameSlice.reducer
