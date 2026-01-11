import type { FC } from 'react'
import { Button } from '@/components/ui/button'

const App: FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Memory Game</h1>
      <p className="text-lg mb-6">Welcome to the Memory Game!</p>
      <div className="flex justify-center gap-4">
        <Button variant="default">Start Game</Button>
        <Button variant="outline">How to Play</Button>
      </div>
    </div>
  )
}

export default App
