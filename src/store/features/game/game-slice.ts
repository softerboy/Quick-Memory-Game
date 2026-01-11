import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type BoardSize = {
  rows: number
  columns: number
}

export const BOARD_SIZES: Record<Difficulty, BoardSize> = {
  easy: { rows: 6, columns: 8 },
  medium: { rows: 6, columns: 12 },
  hard: { rows: 6, columns: 16 },
}

export type GameState = {
  score: number
  // stores the index of the opened cards
  flippedCards: number[]
  difficulty: Difficulty
  boardSize: BoardSize
}

const initialState: GameState = {
  flippedCards: [],
  score: 0,
  difficulty: 'easy',
  boardSize: BOARD_SIZES.easy,
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
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload
      state.boardSize = BOARD_SIZES[action.payload]
      state.flippedCards = [] // Reset flipped cards when difficulty changes
    },
  },
})

export const { flipCard, setDifficulty } = gameSlice.actions
export default gameSlice.reducer
