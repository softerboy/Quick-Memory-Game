import { Button } from '@/components/ui/button'

interface HowToPlayScreenProps {
  onBackToMenu: () => void
}

export default function HowToPlayScreen({ onBackToMenu }: HowToPlayScreenProps) {
  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center flex-grow">
      <h2 className="text-3xl font-bold mb-6 text-primary">How to Play</h2>
      <ul className="text-left list-disc pl-6 space-y-3 mb-8 bg-secondary/50 p-6 rounded-xl border-2 border-primary/20 shadow-[0_4px_0_0] shadow-primary/20">
        <li className="text-lg">
          The board is filled with face-down cards, each with an emoji hidden underneath.
        </li>
        <li className="text-lg">Click two cards to flip them over.</li>
        <li className="text-lg">If the two cards match, they stay face-up and you earn points.</li>
        <li className="text-lg">If they don't match, they flip back after 1 second.</li>
        <li className="text-lg">Continue until all pairs are found.</li>
      </ul>
      <Button onClick={onBackToMenu} variant="outline" size="lg">
        Back to Menu
      </Button>
    </div>
  )
}
