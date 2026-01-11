import React from 'react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/store.ts'
import { type Difficulty, setDifficulty } from '@/store/features/game/game-slice.ts'
import HowToPlayScreen from '@/components/ui/how-to-play-screen'

interface WelcomeScreenProps {
  onStartGame: () => void
  onBackToMenu?: () => void
}

export default function WelcomeScreen({ onStartGame }: WelcomeScreenProps) {
  const { difficulty } = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()
  const [showHowToPlay, setShowHowToPlay] = React.useState(false)

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    dispatch(setDifficulty(newDifficulty))
  }

  const handleStartGame = () => {
    onStartGame()
  }

  return (
    <div className="flex flex-col flex-grow">
      {!showHowToPlay ? (
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-7xl font-bold mb-8 text-primary flex justify-center items-center gap-4">
            <span className="text-4xl">🎮</span>
            <span>Memory Game</span>
            <span className="text-4xl">🧠</span>
          </h1>
          <p className="text-xl mb-6 bg-secondary/50 p-4 rounded-xl border-2 border-primary/20 shadow-[0_4px_0_0] shadow-primary/20 max-w-md">
            Welcome to the Memory Game!
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <Button onClick={handleStartGame} variant="default" size="lg">
              Start Game
            </Button>
            <Button onClick={() => setShowHowToPlay(true)} variant="outline" size="lg">
              How to Play
            </Button>
          </div>

          <div className="mt-6 flex justify-center gap-4">
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
        <HowToPlayScreen onBackToMenu={() => setShowHowToPlay(false)} />
      )}
    </div>
  )
}
