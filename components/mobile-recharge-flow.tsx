"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, X, User, ChevronDown, CreditCard } from "lucide-react"
import VerificationScreen from "./show"

type TopUpOption = {
  days: number
  amount: number
  validity: string
}

const topUpOptions: TopUpOption[] = [
  { days: 7, amount: 2, validity: "7 أيام" },
  { days: 15, amount: 4, validity: "15 يوماً" },
  { days: 30, amount: 6, validity: "30 يوماً" },
  { days: 90, amount: 12, validity: "90 يوماً" },
  { days: 180, amount: 22, validity: "180 يوماً" },
  { days: 365, amount: 30, validity: "365 يوماً" },
]

export default function MobileRechargeFlow() {
  const [step, setStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState<TopUpOption | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [show, setShow] = useState(false)

  const handleNextStep = () => setStep((prev) => prev + 1)
  const handlePrevStep = () => setStep((prev) => prev - 1)


  const renderHeader = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex items-center justify-between p-2 border-b">
            <Button variant="ghost" size="sm" className="text-gray-600">
              إلغاء
            </Button>
            <h2 className="font-semibold">الدفع السريع</h2>
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )
      case 2:
        return (
          <div className="flex items-center justify-between p-4 border-b">
            <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
              <X className="h-5 w-5" />
            </Button>
            <h2 className="font-semibold">الدفع السريع</h2>
            <Button variant="ghost" size="icon" disabled>
              <ArrowRight className="h-5 w-5 text-gray-300" />
            </Button>
          </div>
        )
      case 3:
        return (
          <div className="flex items-center justify-between p-4 border-b">
            <Button variant="ghost" size="sm" className="text-gray-600" onClick={() => setStep(2)}>
              إلغاء
            </Button>
            <h2 className="font-semibold">الدفع السريع</h2>
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-6 bg-gray-50 flex-grow">
            <Tabs defaultValue="recharge" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recharge">إعادة التعبئة  مع eeZee</TabsTrigger>
                <TabsTrigger value="bills">دفع الفواتير</TabsTrigger>
              </TabsList>
              <TabsContent value="recharge" className="pt-6 space-y-6">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 pb-2 block">
                    أرغب في إعادة تعبئة الرصيد ب
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input id="phone" placeholder="ادخل رقمك 9XXXXXX" className="pl-10 text-right" onChange={(e)=>setPhoneNumber(e.target.value)}/>
                  </div>
                </div>
                <div>
                  <Label htmlFor="amount" className="text-sm font-medium text-gray-700 pb-2 block">
                    مبلغ إعادة التعبئة
                  </Label>
                  <Button variant="outline" className="w-full justify-between bg-transparent" onClick={handleNextStep}>
                    <span>اختر المبلغ</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="bills" className="pt-6 space-y-6">
                <div>
                  <Label htmlFor="subscriber-number" className="text-sm font-medium text-gray-700 pb-2 block">
                    رقم المشترك
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input id="subscriber-number" placeholder="ادخل رقم المشترك" className="pl-10 text-right"  onChange={(e)=>setPhoneNumber(e.target.value)}/>
                  </div>
                </div>
                <div>
                  <Label htmlFor="bill-amount" className="text-sm font-medium text-gray-700 pb-2 block">
                    المبلغ
                  </Label>
                  <Input id="bill-amount" placeholder="ادخل المبلغ" type="number" className="text-right" />
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-auto pt-6 text-center">
              <Button className="w-full bg-gray-200 text-gray-500 hover:bg-gray-300">التالي</Button>
              <p className="mt-4 text-sm">
                هل لديك قسيمة رصيد لإعادة التعبئة؟{" "}
                <a href="#" className="font-semibold text-pink-600">
                  إضغط هنا
                </a>
              </p>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="font-semibold text-lg mb-4">مبلغ إعادة التعبئة</h3>
            <RadioGroup
              onValueChange={(value) =>
                setSelectedOption(topUpOptions.find((o) => o.amount.toString() === value) || null)
              }
              className="space-y-3 flex-grow"
            >
              {topUpOptions.map((option) => (
                <Label
                  key={option.amount}
                  className="flex items-center justify-between p-4 border rounded-lg cursor-pointer has-[:checked]:border-pink-500 has-[:checked]:bg-pink-50"
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value={option.amount.toString()} id={`opt-${option.amount}`} />
                    <div>
                      <p className="font-semibold">{option.validity}</p>
                      <p className="text-sm text-gray-500">الصلاحية</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg">{option.amount} د.ك</p>
                </Label>
              ))}
              <Label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer has-[:checked]:border-pink-500 has-[:checked]:bg-pink-50">
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="other" id="opt-other" />
                  <p className="font-semibold">مبلغ آخر</p>
                </div>
              </Label>
            </RadioGroup>
            <div className="mt-6">
              <Button
                className="w-full bg-gray-200 text-gray-500 hover:bg-gray-300 data-[enabled=true]:bg-pink-600 data-[enabled=true]:text-white"
                onClick={handleNextStep}
                disabled={!selectedOption}
                data-enabled={!!selectedOption}
              >
                متابعة
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="font-semibold text-lg mb-4">اختر طريقة الدفع</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <PaymentOption
                value="knet"
                disabled={true}
                label="كي نت"
                icon={<img src="/next.svg" alt="Knet" />}
              />
              <PaymentOption
                value="credit-card"
                label="بطاقة ائتمانية"
                icon={<CreditCard className="h-6 w-6 text-gray-600" />}
              />

              {paymentMethod === "credit-card" && (
                <Card className="bg-gray-50 border-none shadow-none">
                  <CardContent className="p-4 space-y-4">
                    <Input placeholder="الرقم" dir="ltr" className="text-left" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="الشهر/السنة" dir="ltr" className="text-left" />
                      <Input placeholder="***" dir="ltr" className="text-left" maxLength={3} />
                    </div>
                  </CardContent>
                </Card>
              )}

            </RadioGroup>

            <div className="mt-auto pt-6">
              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-600">
                  إعادة التعبئة لـ: <span className="font-semibold text-black">{phoneNumber}</span>
                </p>
                <p className="font-bold text-lg">{selectedOption?.amount || 2} د.ك</p>
              </div>
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white" onClick={()=>{
setTimeout(() => {
  setShow(true)
  
}, 4000);
}}>إعادة التعبئة</Button>
              <p className="mt-3 text-xs text-gray-500 text-center">
                عند الضغط على "إعادة التعبئة"، أنت توافق على{" "}
                <a href="#" className="underline">
                  شروط و أحكام زين
                </a>{" "}
                و{" "}
                <a href="#" className="underline">
                  سياسة الخصوصية
                </a>
              </p>
            </div>
          </div>
        )
      default:
        return <VerificationScreen/>
    }
  }

  return (
    <div
      className="w-full max-w-sm mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col h-[812px]"
      dir="rtl"
    >
      {renderHeader()}
      {renderStepContent()}
      {show&&<VerificationScreen/>}
    </div>
  )
}

const PaymentOption = ({ value, label, icon,disabled }: { value: string; label: string; icon: React.ReactNode,disabled?:boolean }) => (
  <Label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer has-[:checked]:border-pink-500">
    <div className="flex items-center gap-4">
      <div className="w-10 h-6 flex items-center justify-center">{icon}</div>
      <span className="font-semibold">{label}</span>
    </div>
    <RadioGroupItem disabled={disabled} value={value} id={`pay-${value}`} className="text-pink-600 border-gray-300 focus:ring-pink-500" />
  </Label>
)
