import { cva } from "class-variance-authority"

// This defines our button variants with enhanced styling
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // New custom variants
        primary: "bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg border-2 border-primary",
        "primary-outline": "border-2 border-primary text-primary bg-transparent hover:bg-primary/10",
        "white-outline": "border-2 border-white text-white bg-transparent hover:bg-white/20",
        action:
          "bg-primary text-white shadow-lg hover:bg-primary/90 hover:shadow-xl hover:translate-y-[-2px] font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
