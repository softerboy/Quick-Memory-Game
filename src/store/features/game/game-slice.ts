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

export type CardContent = {
  emoji: string
  id: number
}

export type GameState = {
  score: number
  // stores the index of the opened cards
  flippedCards: number[]
  // stores the index of matched pairs
  matchedPairs: number[]
  // stores the card contents (emojis)
  cardContents: CardContent[]
  // tracks the number of moves
  moveCount: number
  // tracks if the game is completed
  gameCompleted: boolean
  // tracks if cards are being checked
  isChecking: boolean
  difficulty: Difficulty
  boardSize: BoardSize
}

const initialState: GameState = {
  flippedCards: [],
  matchedPairs: [],
  cardContents: [],
  score: 0,
  moveCount: 0,
  gameCompleted: false,
  isChecking: false,
  difficulty: 'easy',
  boardSize: BOARD_SIZES.easy,
}

// List of emojis to use for the cards
const EMOJIS = [
  '😀',
  '😁',
  '😂',
  '🤣',
  '😃',
  '😄',
  '😅',
  '😆',
  '😉',
  '😊',
  '😋',
  '😎',
  '😍',
  '😘',
  '🥰',
  '😗',
  '😙',
  '😚',
  '🙂',
  '🤗',
  '🤩',
  '🤔',
  '🤨',
  '😐',
  '😑',
  '😶',
  '🙄',
  '😏',
  '😣',
  '😥',
  '😮',
  '🤐',
  '😯',
  '😪',
  '😫',
  '🥱',
  '😴',
  '😌',
  '😛',
  '😜',
  '😝',
  '🤤',
  '😒',
  '😓',
  '😔',
  '😕',
  '🙃',
  '🤑',
  '😲',
  '🙁',
  '😖',
  '😞',
  '😟',
  '😤',
  '😢',
  '😭',
  '😦',
  '😧',
  '😨',
  '😩',
  '🤯',
  '😬',
  '😰',
  '😱',
]

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Function to create card contents with pairs of emojis
const createCardContents = (totalCards: number): CardContent[] => {
  // We need pairs, so we can only use totalCards/2 emojis
  const pairsCount = totalCards / 2

  // Select emojis for the pairs (limited by available emojis)
  const selectedEmojis = EMOJIS.slice(0, pairsCount)

  // Create pairs of cards with the same emoji
  const pairs = selectedEmojis.flatMap(emoji => [
    { emoji, id: Math.random() },
    { emoji, id: Math.random() },
  ])

  // Shuffle the pairs
  return shuffleArray(pairs)
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGame: state => {
      const totalCards = state.boardSize.rows * state.boardSize.columns
      state.cardContents = createCardContents(totalCards)
      state.flippedCards = []
      state.matchedPairs = []
      state.score = 0
      state.moveCount = 0
      state.gameCompleted = false
      state.isChecking = false
    },
    flipCard: (state, action) => {
      // Don't allow flipping if we're checking cards or the card is already matched
      if (state.isChecking || state.matchedPairs.includes(action.payload)) {
        return
      }

      // If two cards are already flipped, reset flippedCards
      if (state.flippedCards.length === 2) {
        state.flippedCards = [action.payload]
        return
      }

      // If the card is already flipped, do nothing
      if (state.flippedCards.includes(action.payload)) {
        return
      }

      // Add the card to flippedCards
      state.flippedCards.push(action.payload)

      // If we now have two flipped cards, check for a match
      if (state.flippedCards.length === 2) {
        const [firstCardIndex, secondCardIndex] = state.flippedCards
        const firstCard = state.cardContents[firstCardIndex]
        const secondCard = state.cardContents[secondCardIndex]

        // If the emojis match, it's a match!
        if (firstCard.emoji === secondCard.emoji) {
          // Add both cards to matchedPairs
          state.matchedPairs.push(firstCardIndex, secondCardIndex)
          // Increase score
          state.score += 10
          // Reset flippedCards
          state.flippedCards = []
          // Increment move count
          state.moveCount += 1

          // Check if all pairs are matched
          if (state.matchedPairs.length === state.cardContents.length) {
            state.gameCompleted = true
          }
        } else {
          // Cards don't match, set isChecking to true
          // The cards will be flipped back after a delay by the checkCards action
          state.isChecking = true
          // Increment move count
          state.moveCount += 1
        }
      }
    },
    checkCards: state => {
      // Reset flippedCards and isChecking
      state.flippedCards = []
      state.isChecking = false
    },
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload
      state.boardSize = BOARD_SIZES[action.payload]
      // Reset game state when difficulty changes
      state.flippedCards = []
      state.matchedPairs = []
      state.cardContents = []
      state.score = 0
      state.moveCount = 0
      state.gameCompleted = false
      state.isChecking = false
    },
  },
})

export const { initializeGame, flipCard, checkCards, setDifficulty } = gameSlice.actions
export default gameSlice.reducer
