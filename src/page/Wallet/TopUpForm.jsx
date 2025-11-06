import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DotFilledIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useDispatch } from 'react-redux'
import { paymentHandler } from '@/state/Wallet/Action'

const TopUpForm = () => {
  const [amount, setAmount] = React.useState('')
  const [paymentMethod, setPaymentMethod] = React.useState('RAZORPAY')
  const dispatch = useDispatch()

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
  }

  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid amount!')
      return
    }

    dispatch(
      paymentHandler({
        jwt: localStorage.getItem('jwt'),
        paymentMethod,
        amount,
      })
    )
  }

  return (
    <div className="pt-6 space-y-6 text-gray-200">
      {/* ====== AMOUNT INPUT ====== */}
      <div>
        <h1 className="pb-2 text-gray-300 font-semibold">Enter Amount</h1>
        <Input
          onChange={handleChange}
          value={amount}
          type="number"
          className="py-7 text-lg bg-[#0f1115] border-gray-700 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Enter amount e.g. 5000"
        />
      </div>

      {/* ====== PAYMENT METHOD ====== */}
      <div>
        <h1 className="pb-2 text-gray-300 font-semibold">Select Payment Method</h1>
        <RadioGroup
          onValueChange={(value) => handlePaymentMethodChange(value)}
          className="flex flex-wrap gap-5"
          defaultValue="RAZORPAY"
        >
          {/* Razorpay Option */}
          <div
            className={`flex items-center space-x-3 border p-3 px-5 rounded-xl transition-all duration-200 cursor-pointer ${
              paymentMethod === 'RAZORPAY'
                ? 'border-emerald-500 bg-emerald-950/30'
                : 'border-gray-700 hover:border-gray-500'
            }`}
          >
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-6 w-6 text-emerald-400"
              value="RAZORPAY"
              id="r1"
            />
            <Label htmlFor="r1">
              <div className="bg-white rounded-md px-5 py-2 w-32 flex justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                  alt="Razorpay"
                  className="h-5"
                />
              </div>
            </Label>
          </div>

          {/* Stripe Option */}
          <div
            className={`flex items-center space-x-3 border p-3 px-5 rounded-xl transition-all duration-200 cursor-pointer ${
              paymentMethod === 'STRIPE'
                ? 'border-indigo-500 bg-indigo-950/30'
                : 'border-gray-700 hover:border-gray-500'
            }`}
          >
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-6 w-6 text-indigo-400"
              value="STRIPE"
              id="r2"
            />
            <Label htmlFor="r2">
              <div className="bg-white rounded-md px-5 py-2 w-32 flex justify-center">
                <img
                  className="h-5"
                  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                  alt="Stripe"
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* ====== SUBMIT BUTTON ====== */}
      <Button
        onClick={handleSubmit}
        className="w-full py-7 text-lg font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-all duration-200"
      >
        Continue to Pay
      </Button>
    </div>
  )
}

export default TopUpForm
