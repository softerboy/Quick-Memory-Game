import React, { type FC } from 'react'

import { Button } from '@/components/ui/button'
import { GameBoard } from '@/components/ui/game-board'

import { useAppDispatch, useAppSelector } from '@/hooks/store.ts'
import { type Difficulty, setDifficulty, initializeGame } from '@/store/features/game/game-slice.ts'

const App: FC = () => {
  const { score, moveCount, gameCompleted, difficulty, matchedPairs, cardContents } =
    useAppSelector(state => state.game)
  const dispatch = useAppDispatch()
  const [gameStarted, setGameStarted] = React.useState(false)
  const [showHowToPlay, setShowHowToPlay] = React.useState(false)

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    dispatch(setDifficulty(newDifficulty))
  }

  const handleStartGame = () => {
    setGameStarted(true)
    dispatch(initializeGame())
  }

  const handleBackToMenu = () => {
    setGameStarted(false)
    setShowHowToPlay(false)
  }

  const allPairsFound =
    gameCompleted && cardContents.length > 0 && matchedPairs.length === cardContents.length

  return (
    <div className="max-w-7xl mx-auto p-4 text-center h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-2">Memory Game</h1>

      {!gameStarted ? (
        <div className="flex flex-col flex-grow">
          {!showHowToPlay ? (
            <div className="flex flex-col items-center justify-center flex-grow">
              <p className="text-lg mb-4">Welcome to the Memory Game!</p>
              <div className="flex justify-center gap-4 mb-4">
                <Button onClick={handleStartGame} variant="default" size="lg">
                  Start Game
                </Button>
                <Button onClick={() => setShowHowToPlay(true)} variant="outline" size="lg">
                  How to Play
                </Button>
              </div>

              <div className="mt-4 flex justify-center gap-4">
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
            </div>
          ) : (
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center flex-grow">
              <h2 className="text-2xl font-bold mb-4">How to Play</h2>
              <ul className="text-left list-disc pl-6 space-y-2 mb-6">
                <li>
                  The board is filled with face-down cards, each with an emoji hidden underneath.
                </li>
                <li>Click two cards to flip them over.</li>
                <li>If the two cards match, they stay face-up and you earn points.</li>
                <li>If they don't match, they flip back after 1 second.</li>
                <li>Continue until all pairs are found.</li>
              </ul>
              <Button onClick={() => setShowHowToPlay(false)} variant="outline">
                Back to Menu
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col flex-grow">
          {allPairsFound ? (
            <div className="flex flex-col items-center justify-center flex-grow">
              <h2 className="text-3xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
              <p className="text-xl mb-6">You found all the pairs!</p>
              <div className="text-lg mb-8">
                <p>
                  Final Score: <span className="font-bold">{score}</span>
                </p>
                <p>
                  Moves: <span className="font-bold">{moveCount}</span>
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
                <div className="flex gap-6">
                  <div className="text-lg font-medium">Score: {score}</div>
                  <div className="text-lg font-medium">Moves: {moveCount}</div>
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
