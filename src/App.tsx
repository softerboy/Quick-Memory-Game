import React, { type FC } from 'react'

import { Button } from '@/components/ui/button'
import { GameBoard } from '@/components/ui/game-board'

import { useAppDispatch, useAppSelector } from '@/hooks/store.ts'
import { type Difficulty, setDifficulty } from '@/store/features/game/game-slice.ts'

const App: FC = () => {
  const count = useAppSelector(state => state.counter.count)
  const difficulty = useAppSelector(state => state.game.difficulty)
  const dispatch = useAppDispatch()
  const [gameStarted, setGameStarted] = React.useState(false)

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    dispatch(setDifficulty(newDifficulty))
  }

  return (
    <div className="max-w-7xl mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Memory Game</h1>

      {!gameStarted ? (
        <>
          <p className="text-lg mb-6">Welcome to the Memory Game!</p>
          <div className="flex justify-center gap-4 mb-4">
            <Button onClick={() => setGameStarted(true)} variant="default" size="lg">
              Start Game
            </Button>
            <Button variant="outline" size="lg">
              How to Play
            </Button>
          </div>

          <div className="mt-4 mb-8 flex justify-center gap-4">
            <Button
              onClick={() => handleDifficultyChange('easy')}
              variant={difficulty === 'easy' ? 'default' : 'outline'}
            >
              Easy
            </Button>
            <Button
              onClick={() => handleDifficultyChange('medium')}
              variant={difficulty === 'medium' ? 'default' : 'outline'}
            >
              Medium
            </Button>
            <Button
              onClick={() => handleDifficultyChange('hard')}
              variant={difficulty === 'hard' ? 'default' : 'outline'}
            >
              Hard
            </Button>
          </div>
        </>
      ) : (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <Button onClick={() => setGameStarted(false)} variant="outline">
              Back to Menu
            </Button>
            <div className="text-lg font-medium">Score: {count}</div>
          </div>

          <div className="h-[70vh]">
            <GameBoard />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
