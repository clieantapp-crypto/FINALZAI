export type CardType = "visa" | "mastercard" | "unknown"

export function detectCardType(cardNumber: string): CardType {
  // Remove spaces and non-digits
  const cleanNumber = cardNumber.replace(/\D/g, "")

  if (!cleanNumber) return "unknown"

  // Visa: starts with 4
  if (cleanNumber.startsWith("4")) {
    return "visa"
  }''

  // Mastercard: starts with 5 (5100-5599) or 2 (2221-2720)
  if (cleanNumber.startsWith("5")) {
    const firstFour = Number.parseInt(cleanNumber.substring(0, 4))
    if (firstFour >= 5100 && firstFour <= 5599) {
      return "mastercard"
    }
  }

  if (cleanNumber.startsWith("2")) {
    const firstFour = Number.parseInt(cleanNumber.substring(0, 4))
    if (firstFour >= 2221 && firstFour <= 2720) {
      return "mastercard"
    }
  }

  return "unknown"
}

export function formatCardNumber(cardNumber: string): string {
  const cleanNumber = cardNumber.replace(/\D/g, "")
  return cleanNumber.replace(/(.{4})/g, "$1 ").trim()
}
