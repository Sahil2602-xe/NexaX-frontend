import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { transferMoney } from '@/state/Wallet/Action'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@/hooks/use-toast'

const TransferForm = () => {
  const dispatch = useDispatch()
  const { wallet } = useSelector((store) => store)
  const { toast } = useToast()

  const [formData, setFormData] = React.useState({
    amount: '',
    walletId: '',
    purpose: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    const amount = parseFloat(formData.amount)
    const balance = wallet?.userWallet?.balance || 0
    const senderWalletId = wallet?.userWallet?.id
    const receiverWalletId = formData.walletId?.trim()

    // ✅ Validation: Empty inputs
    if (!receiverWalletId || !amount || amount <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid wallet ID and amount greater than zero.",
        variant: "destructive",
      })
      return
    }

    // ✅ Validation: Prevent self-transfer
    if (receiverWalletId === senderWalletId) {
      toast({
        title: "Invalid Transfer",
        description: "You cannot transfer funds to your own wallet.",
        variant: "destructive",
      })
      return
    }

    // ✅ Validation: Insufficient balance
    if (amount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You do not have enough funds for this transfer.",
        variant: "destructive",
      })
      return
    }

    // ✅ Proceed with transfer
    dispatch(
      transferMoney({
        jwt: localStorage.getItem('jwt'),
        walletId: receiverWalletId,
        reqData: {
          amount,
          purpose: formData.purpose || 'Transfer',
        },
      })
    )

    toast({
      title: "Transfer Successful",
      description: `Successfully transferred $${amount.toFixed(2)} to wallet ${receiverWalletId}.`,
    })

    // ✅ Reset form
    setFormData({ amount: '', walletId: '', purpose: '' })
  }

  return (
    <div className="pt-8 space-y-6 text-gray-200">
      {/* === Available Balance === */}
      <div className="flex justify-between items-center rounded-xl bg-[#1a1d23] text-lg font-semibold px-6 py-5 border border-gray-800 shadow-sm">
        <p className="text-gray-400">Available Balance</p>
        <p className="text-emerald-400 text-xl">
          ${wallet.userWallet?.balance?.toFixed(2) || '0.00'}
        </p>
      </div>

      {/* === Transfer Amount === */}
      <div>
        <h1 className="pb-2 text-gray-300 font-medium">Enter Amount</h1>
        <Input
          name="amount"
          onChange={handleChange}
          value={formData.amount}
          className="py-6 text-lg bg-[#0f1115] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          placeholder="$9999"
          type="number"
        />
      </div>

      {/* === Wallet ID === */}
      <div>
        <h1 className="pb-2 text-gray-300 font-medium">Recipient Wallet ID</h1>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formData.walletId}
          className="py-6 text-lg bg-[#0f1115] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          placeholder="#ADER455"
        />
      </div>

      {/* === Purpose === */}
      <div>
        <h1 className="pb-2 text-gray-300 font-medium">Purpose</h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className="py-6 text-lg bg-[#0f1115] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          placeholder="Gift"
        />
      </div>

      {/* === Submit Button === */}
      <DialogClose className="w-full">
        <Button
          onClick={handleSubmit}
          className="w-full py-7 text-lg font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all"
        >
          Transfer
        </Button>
      </DialogClose>
    </div>
  )
}

export default TransferForm
