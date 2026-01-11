import { configureStore } from '@reduxjs/toolkit'

import gameReducer from './features/game/game-slice'
import counterReducer from './features/counter/counter-slice'

export const store = configureStore({
  reducer: { counter: counterReducer, game: gameReducer },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
