import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { getPaymentDetails, withdrawalRequest } from '@/state/Withdrawal/Action'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@/hooks/use-toast' // ✅ using same toast as TradingForm

const WithdrawalForm = () => {
  const [amount, setAmount] = useState('')
  const dispatch = useDispatch()
  const { wallet, withdrawal } = useSelector((store) => store)
  const { toast } = useToast() // ✅ initialize toast

  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  const handleSubmit = () => {
    const withdrawAmount = parseFloat(amount)
    const balance = wallet?.userWallet?.balance || 0

    if (!withdrawAmount || withdrawAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      })
      return
    }

    if (withdrawAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough funds for this withdrawal.",
        variant: "destructive",
      })
      return
    }

    dispatch(withdrawalRequest({ amount: withdrawAmount, jwt: localStorage.getItem('jwt') }))

    toast({
      title: "Withdrawal Requested",
      description: `Your withdrawal of $${withdrawAmount.toFixed(2)} has been submitted.`,
    })

    setAmount('') // ✅ reset field
  }

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }))
  }, [dispatch])

  const availableBalance = wallet?.userWallet?.balance || 0

  return (
    <div className="pt-8 space-y-6 text-gray-200">
      {/* === Available Balance === */}
      <div className="flex justify-between items-center rounded-xl bg-[#1a1d23] text-lg font-semibold px-6 py-5 border border-gray-800 shadow-sm">
        <p className="text-gray-400">Available Balance</p>
        <p className="text-emerald-400 text-xl">
          ${availableBalance.toFixed(2)}
        </p>
      </div>

      {/* === Input Field === */}
      <div className="flex flex-col items-center text-center space-y-3">
        <h1 className="text-lg text-gray-300 font-medium">
          Enter Withdrawal Amount
        </h1>
        <Input
          onChange={handleChange}
          value={amount}
          className="withdrawalInput py-6 w-1/2 border border-gray-700 bg-[#0f1115] text-2xl text-center text-white rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          placeholder="$9999"
          type="number"
        />
      </div>

      {/* === Transfer To === */}
      <div className="space-y-2">
        <p className="text-gray-400">Transfer To</p>
        <div className="flex items-center gap-4 border border-gray-800 bg-[#1a1d23]/90 px-5 py-3 rounded-xl shadow-sm hover:bg-[#1f242c]/80 transition-all">
          <img
            className="h-9 w-9 rounded-md object-contain bg-white p-1"
            src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"
            alt="bankAccount"
          />
          <div className="space-y-0.5">
            <p className="text-base font-semibold text-white">
              {withdrawal.paymentDetails?.bankName || 'Your Bank'}
            </p>
            <p className="text-xs text-gray-400 tracking-wider">
              {withdrawal.paymentDetails?.accountNumber
                ? '•••• ' + withdrawal.paymentDetails.accountNumber.slice(-4)
                : 'No account linked'}
            </p>
          </div>
        </div>
      </div>

      {/* === Submit Button === */}
      <DialogClose className="w-full">
        <Button
          onClick={handleSubmit}
          className="w-full py-7 text-lg font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all"
        >
          Withdraw
        </Button>
      </DialogClose>
    </div>
  )
}

export default WithdrawalForm
