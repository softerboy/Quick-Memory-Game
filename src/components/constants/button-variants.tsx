import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border-primary/70 shadow-[0_4px_0_0] shadow-primary/70 hover:translate-y-0.5 hover:shadow-[0_2px_0_0] hover:shadow-primary/70 active:translate-y-1 active:shadow-none transition-all',
        destructive:
          'bg-destructive text-destructive-foreground border-destructive/70 shadow-[0_4px_0_0] shadow-destructive/70 hover:translate-y-0.5 hover:shadow-[0_2px_0_0] hover:shadow-destructive/70 active:translate-y-1 active:shadow-none transition-all',
        outline:
          'border-2 border-input bg-background shadow-[0_4px_0_0] shadow-border hover:bg-accent hover:text-accent-foreground hover:translate-y-0.5 hover:shadow-[0_2px_0_0] active:translate-y-1 active:shadow-none transition-all',
        secondary:
          'bg-secondary text-secondary-foreground border-secondary/30 shadow-[0_4px_0_0] shadow-secondary/30 hover:translate-y-0.5 hover:shadow-[0_2px_0_0] hover:shadow-secondary/30 active:translate-y-1 active:shadow-none transition-all',
        ghost: 'hover:bg-accent hover:text-accent-foreground border-transparent',
        link: 'text-primary underline-offset-4 hover:underline border-transparent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-xl px-3 text-xs',
        lg: 'h-11 rounded-xl px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
