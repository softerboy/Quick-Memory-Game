import * as React from 'react'
import { useEffect } from 'react'

import { cn } from '@/lib/utils'

import { GameCard } from './game-card'
import { useAppDispatch, useAppSelector } from '@/hooks/store.ts'
import { flipCard, initializeGame, checkCards } from '@/store/features/game/game-slice.ts'

type GameBoardProps = React.HTMLAttributes<HTMLDivElement>

const GameBoard = React.forwardRef<HTMLDivElement, GameBoardProps>(
  ({ className, ...props }, ref) => {
    const { flippedCards, matchedPairs, boardSize, cardContents, isChecking } = useAppSelector(
      state => state.game
    )
    const { rows, columns } = boardSize
    const dispatch = useAppDispatch()

    // Initialize the game when the component mounts
    useEffect(() => {
      dispatch(initializeGame())
    }, [dispatch])

    // Handle the 1-second delay for flipping non-matching cards back
    useEffect(() => {
      if (isChecking) {
        const timer = setTimeout(() => {
          dispatch(checkCards())
        }, 1000)

        return () => clearTimeout(timer)
      }
    }, [isChecking, dispatch])

    return (
      <div
        className={cn(
          'w-full h-full grid gap-2 sm:gap-3 p-2 sm:p-3 justify-center content-center max-h-full bg-secondary/50 rounded-xl border-2 border-primary/20',
          className
        )}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
        ref={ref}
        {...props}
      >
        {cardContents.map((card, index) => (
          <div key={index} className="aspect-square w-full max-w-full max-h-full">
            <GameCard
              onClick={() => dispatch(flipCard(index))}
              isFlipped={flippedCards.includes(index) || matchedPairs.includes(index)}
              backContent={
                <div className="text-center p-1">
                  <span className="text-2xl sm:text-3xl md:text-4xl">{card.emoji}</span>
                </div>
              }
            />
          </div>
        ))}
      </div>
    )
  }
)

GameBoard.displayName = 'GameBoard'

export { GameBoard }
