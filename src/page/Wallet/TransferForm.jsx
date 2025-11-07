import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { transferMoney } from '@/state/Wallet/Action'
import { useToast } from '@/hooks/use-toast'

const TransferForm = () => {
  const [receiverId, setReceiverId] = useState('')
  const [amount, setAmount] = useState('')
  const dispatch = useDispatch()
  const { wallet } = useSelector((store) => store)
  const { toast } = useToast()

  const handleSubmit = () => {
    const transferAmount = parseFloat(amount)
    const balance = wallet?.userWallet?.balance || 0
    const senderWalletId = wallet?.userWallet?.id

    // ✅ Validation: Empty fields
    if (!receiverId.trim() || !transferAmount) {
      toast({
        title: "Invalid Input",
        description: "Please enter both Wallet ID and a valid amount.",
        variant: "destructive",
      })
      return
    }

    // ✅ Validation: Non-positive amounts
    if (transferAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Transfer amount must be greater than zero.",
        variant: "destructive",
      })
      return
    }

    // ✅ Validation: Insufficient balance
    if (transferAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough funds for this transfer.",
        variant: "destructive",
      })
      return
    }

    // ✅ Optional: Prevent self-transfer
    if (receiverId === senderWalletId) {
      toast({
        title: "Invalid Transfer",
        description: "You cannot transfer funds to your own wallet.",
        variant: "destructive",
      })
      return
    }

    // ✅ Dispatch transfer action
    dispatch(
      transferMoney({
        jwt: localStorage.getItem('jwt'),
        amount: transferAmount,
        receiverWalletId: receiverId,
      })
    )

    toast({
      title: "Transfer Initiated",
      description: `You have sent $${transferAmount.toFixed(2)} successfully.`,
    })

    // ✅ Reset form
    setReceiverId('')
    setAmount('')
  }

  return (
    <div className="pt-8 space-y-6 text-gray-200">
      {/* === Wallet ID Input === */}
      <div>
        <p className="text-gray-400 mb-2">Receiver Wallet ID</p>
        <Input
          onChange={(e) => setReceiverId(e.target.value)}
          value={receiverId}
          placeholder="Enter receiver wallet ID"
          className="py-6 border border-gray-700 bg-[#0f1115] text-lg text-white rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
        />
      </div>

      {/* === Amount Input === */}
      <div>
        <p className="text-gray-400 mb-2">Amount</p>
        <Input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          placeholder="$1000"
          type="number"
          className="py-6 border border-gray-700 bg-[#0f1115] text-lg text-white rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
        />
      </div>

      {/* === Submit Button === */}
      <Button
        onClick={handleSubmit}
        className="w-full py-7 text-lg font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all"
      >
        Transfer
      </Button>
    </div>
  )
}

export default TransferForm
