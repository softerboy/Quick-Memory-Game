import React, { type FC } from 'react'

import { Button } from '@/components/ui/button'
import { GameBoard } from '@/components/ui/game-board'

import { useAppSelector } from '@/hooks/store.ts'

const App: FC = () => {
  const count = useAppSelector(state => state.counter.count)
  const [gameStarted, setGameStarted] = React.useState(false)

  return (
    <div className="max-w-7xl mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Memory Game</h1>

      {!gameStarted ? (
        <>
          <p className="text-lg mb-6">Welcome to the Memory Game!</p>
          <div className="flex justify-center gap-4 mb-8">
            <Button onClick={() => setGameStarted(true)} variant="default" size="lg">
              Start Game
            </Button>
            <Button variant="outline" size="lg">
              How to Play
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
