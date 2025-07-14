import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add a utility function to determine if a color is light or dark
export function isLightColor(hexColor: string): boolean {
  // Remove the # if it exists
  hexColor = hexColor.replace("#", "")

  // Convert to RGB
  const r = Number.parseInt(hexColor.substr(0, 2), 16)
  const g = Number.parseInt(hexColor.substr(2, 2), 16)
  const b = Number.parseInt(hexColor.substr(4, 2), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return true if light, false if dark
  return luminance > 0.5
}

// Function to add a hover effect to buttons
export function addButtonHoverEffect(element: HTMLElement): void {
  element.addEventListener("mouseenter", () => {
    element.classList.add("scale-105")
    element.classList.add("shadow-lg")
  })

  element.addEventListener("mouseleave", () => {
    element.classList.remove("scale-105")
    element.classList.remove("shadow-lg")
  })
}
