import React, { type FC } from 'react'

import { Button } from '@/components/ui/button'
import { GameBoard } from '@/components/ui/game-board'
import WelcomeScreen from '@/components/ui/welcome-screen'

import { useAppDispatch, useAppSelector } from '@/hooks/store.ts'
import { initializeGame } from '@/store/features/game/game-slice.ts'

const App: FC = () => {
  const { score, moveCount, gameCompleted, matchedPairs, cardContents } = useAppSelector(
    state => state.game
  )
  const dispatch = useAppDispatch()
  const [gameStarted, setGameStarted] = React.useState(false)

  const handleStartGame = () => {
    setGameStarted(true)
    dispatch(initializeGame())
  }

  const handleBackToMenu = () => {
    setGameStarted(false)
  }

  const allPairsFound =
    gameCompleted && cardContents.length > 0 && matchedPairs.length === cardContents.length

  return (
    <div className="max-w-7xl mx-auto p-6 text-center h-full flex flex-col bg-background/10 backdrop-blur-sm rounded-2xl">
      {!gameStarted ? (
        <WelcomeScreen onStartGame={handleStartGame} onBackToMenu={handleBackToMenu} />
      ) : (
        <div className="flex flex-col flex-grow">
          {allPairsFound ? (
            <div className="flex flex-col items-center justify-center flex-grow">
              <h2 className="text-4xl font-bold mb-4 text-primary animate-bounce">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-2xl mb-6 text-accent-foreground">You found all the pairs!</p>
              <div className="text-lg mb-8 p-4 bg-secondary/50 rounded-xl border-2 border-primary/20 shadow-[0_4px_0_0] shadow-primary/20">
                <p className="mb-2">
                  Final Score: <span className="font-bold text-primary text-xl">{score}</span>
                </p>
                <p>
                  Moves: <span className="font-bold text-primary text-xl">{moveCount}</span>
                </p>
              </div>
              <div className="flex gap-4">
                <Button onClick={handleStartGame} variant="default">
                  Play Again
                </Button>
                <Button onClick={handleBackToMenu} variant="outline">
                  Back to Menu
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <Button onClick={handleBackToMenu} variant="outline">
                  Back to Menu
                </Button>
                <div className="flex gap-4">
                  <div className="text-lg font-bold px-3 py-1 bg-secondary/70 rounded-lg border-2 border-primary/20">
                    Score: <span className="text-primary">{score}</span>
                  </div>
                  <div className="text-lg font-bold px-3 py-1 bg-secondary/70 rounded-lg border-2 border-primary/20">
                    Moves: <span className="text-primary">{moveCount}</span>
                  </div>
                </div>
              </div>

              <div className="flex-grow overflow-hidden flex items-center justify-center">
                <div className="w-full h-full max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-140px)] md:max-h-[calc(100vh-160px)]">
                  <GameBoard />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default App
