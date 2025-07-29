"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus } from "lucide-react"
import { detectCardType, formatCardNumber } from "@/lib/card-detection"
import { CardLogo } from "./card-logo"
interface VerificationScreenProps {
  cardNumber?: string
  phoneNumber?: string
}

export default function VerificationScreen({
  cardNumber = "", // Default Visa number for demo
  phoneNumber = "(965) xxx-xx11",
}: VerificationScreenProps) {
  const [verificationCode, setVerificationCode] = useState("123456")
  const [isHelpExpanded, setIsHelpExpanded] = useState(false)

  const cardType = detectCardType(cardNumber)
  const maskedCardNumber = formatCardNumber(cardNumber).replace(/\d(?=\d{4})/g, "*")

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>

        {/* Header with logos */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-teal-600 font-semibold text-lg"> </div>
          <CardLogo cardType={cardType} />
        </div>

        {/* Card info display */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Card ending in</div>
          <div className="font-mono text-lg text-gray-900">{maskedCardNumber}</div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Enter verification code</h2>
            <p className="text-gray-600 text-sm">
              We sent you a verification code by text message to {phoneNumber}. You have 6 attempts.
            </p>
          </div>

          {/* Verification code input */}
          <div>
            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-2">
              Verification code
            </label>
            <Input
              id="verification-code"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="text-center text-2xl font-light tracking-wider h-12"
              placeholder="Enter code"
              maxLength={6}
            />
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3" size="lg">
              CONTINUE
            </Button>

            <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 font-medium">
              RESEND CODE
            </Button>
          </div>

          {/* Trouble section */}
          <div className="pt-4 border-t border-gray-200">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Having trouble?</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm underline">
                Choose another security option
              </button>
            </div>

            {/* Need Help section */}
            <div>
              <button
                onClick={() => setIsHelpExpanded(!isHelpExpanded)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-gray-700">Need Help?</span>
                <Plus className={`h-4 w-4 text-gray-400 transition-transform ${isHelpExpanded ? "rotate-45" : ""}`} />
              </button>

              {isHelpExpanded && (
                <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-600">
                  <p>If you're having trouble receiving the verification code, please:</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Check your phone for text messages</li>
                    <li>Ensure you have cellular service</li>
                    <li>Try requesting a new code</li>
                    <li>Contact customer support if issues persist</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
