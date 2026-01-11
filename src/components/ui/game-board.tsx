import * as React from 'react'

import { cn } from '@/lib/utils'

import { GameCard } from './game-card'
import { useAppDispatch, useAppSelector } from '@/hooks/store.ts'
import { flipCard } from '@/store/features/game/game-slice.ts'

interface GameBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number
  columns?: number
}

const GameBoard = React.forwardRef<HTMLDivElement, GameBoardProps>(
  ({ className, rows = 8, columns = 16, ...props }, ref) => {
    const flippedCards = useAppSelector(state => state.game.flippedCards)
    const dispatch = useAppDispatch()

    // Create an array of card data
    const cards = React.useMemo(() => {
      return Array.from({ length: rows * columns }, (_, index) => ({
        id: index,
        content: `Card ${index + 1}`,
      }))
    }, [rows, columns])

    return (
      <div
        className={cn('w-full grid gap-4 p-4', className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
        ref={ref}
        {...props}
      >
        {cards.map(card => (
          <div key={card.id} className="aspect-square">
            <GameCard
              onClick={() => dispatch(flipCard(card.id))}
              isFlipped={flippedCards.includes(card.id)}
              backContent={
                <div className="text-center p-2">
                  <span className="text-lg font-medium">{card.content}</span>
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
