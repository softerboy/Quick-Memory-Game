import * as React from 'react'
import { cn } from '@/lib/utils'

interface GameCardProps extends React.HTMLAttributes<HTMLDivElement> {
  frontContent?: React.ReactNode
  backContent?: React.ReactNode
  isFlipped?: boolean
}

const GameCard = React.forwardRef<HTMLDivElement, GameCardProps>(
  ({ className, frontContent, backContent, isFlipped = false, ...props }, ref) => {
    return (
      <div
        className={cn('relative w-full h-full perspective-1000 cursor-pointer', className)}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            'relative w-full h-full transition-transform duration-500 transform-style-3d',
            isFlipped ? 'rotate-y-180' : ''
          )}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden bg-primary/10 rounded-xl border-2 border-primary/30 shadow-[0_4px_0_0] shadow-primary/30 flex items-center justify-center rotate-y-0">
            {frontContent || (
              <div className="text-2xl sm:text-xs md:text-4xl font-bold text-primary/40">?</div>
            )}
          </div>

          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden bg-card rounded-xl border-2 border-primary/30 shadow-[0_4px_0_0] shadow-primary/30 flex items-center justify-center rotate-y-180">
            {backContent || (
              <div className="text-base sm:text-xl md:text-2xl font-bold">Content</div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

GameCard.displayName = 'GameCard'

export { GameCard }
