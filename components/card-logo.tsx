import { CardType } from "@/lib/card-detection"

interface CardLogoProps {
  cardType: CardType
  className?: string
}

export function CardLogo({ cardType, className = "" }: CardLogoProps) {
  if (cardType === "visa" || cardType==='unknown') {
    return <div className={`text-blue-800 font-bold text-xl italic ${className}`}>
    <img src="/logo_vuisz.png" alt="logo"  width={60}/>
    </div>
  }

  if (cardType === "mastercard") {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-red-500 rounded-full opacity-90"></div>
          <div className="w-6 h-6 bg-yellow-500 rounded-full -ml-3 opacity-90"></div>
        </div>
        <span className="ml-2 font-bold text-lg text-gray-800">
    <img src="/MasterCard_Logo.svg.png" alt="logo"  width={60} />
          </span>
      </div>
    )
  }

  return <div className={`text-gray-400 font-medium text-lg ${className}`}>CARD</div>
}
