import type { FC } from 'react'

import { Button } from '@/components/ui/button'

import { useAppDispatch, useAppSelector } from '@/hooks/store.ts'
import { decrement, increment } from '@/store/features/counter/counterSlice.ts'

const App: FC = () => {
  const count = useAppSelector(state => state.counter.count)
  const dispatch = useAppDispatch()

  return (
    <div className="max-w-7xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Memory Game</h1>
      <p className="text-lg mb-6">Welcome to the Memory Game!</p>
      <div className="flex justify-center gap-4">
        <Button onClick={() => dispatch(increment())} variant="default">
          Start Game
        </Button>
        <Button onClick={() => dispatch(decrement())} variant="outline">
          How to Play
        </Button>

        <h1>{count}</h1>
      </div>
    </div>
  )
}

export default App
