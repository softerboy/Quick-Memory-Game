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
        className={cn('w-full grid gap-4 p-4 justify-center', className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, auto)`,
          gridTemplateRows: `repeat(${rows}, auto)`,
        }}
        ref={ref}
        {...props}
      >
        {cardContents.map((card, index) => (
          <div key={index} className="aspect-square w-24 h-24">
            <GameCard
              onClick={() => dispatch(flipCard(index))}
              isFlipped={flippedCards.includes(index) || matchedPairs.includes(index)}
              backContent={
                <div className="text-center p-2">
                  <span className="text-4xl">{card.emoji}</span>
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
