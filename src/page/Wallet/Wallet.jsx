import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  ReloadIcon,
  UpdateIcon,
} from '@radix-ui/react-icons'
import {
  CopyIcon,
  DollarSignIcon,
  DownloadIcon,
  ShuffleIcon,
  UploadIcon,
  WalletIcon,
} from 'lucide-react'
import React, { useEffect } from 'react'
import TopUpForm from './TopUpForm'
import WithdrawalForm from './WithdrawalForm'
import TransferForm from './TransferForm'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import {
  depositMoney,
  getUserWallet,
  getWalletTransactions,
} from '@/state/Wallet/Action'
import { useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export const Wallet = () => {
  const dispatch = useDispatch()
  const { wallet } = useSelector((store) => store)
  const query = useQuery()
  const orderId = query.get('order_id')
  const paymentId = query.get('payment_id')
  const razorpayPaymentId = query.get('razorpay_payment_id')
  const stripeSessionId = query.get('session_id')
  const navigate = useNavigate()

  useEffect(() => {
    handleFetchUserWallet()
    handleFetchWalletTransaction()
  }, [])

  const depositProcessed = React.useRef(false);


  useEffect(() => {
  const finalPaymentId =
    razorpayPaymentId || paymentId || stripeSessionId;

  if (orderId && finalPaymentId && !depositProcessed.current) {
    depositProcessed.current = true; // prevent duplicate deposit
    dispatch(
      depositMoney({
        jwt: localStorage.getItem('jwt'),
        orderId,
        paymentId: finalPaymentId,
        navigate,
      })
    )
  }
}, [orderId, paymentId, razorpayPaymentId, stripeSessionId])


  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem('jwt')))
  }

  const handleFetchWalletTransaction = () => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem('jwt') }))
  }

  return (
    <div className="flex flex-col items-center text-gray-200">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card className="border border-gray-800 bg-[#0f1115]/80 shadow-lg backdrop-blur-sm rounded-2xl">
          <CardHeader className="pb-9 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <WalletIcon size={30} className="text-emerald-400" />
                <div>
                  <CardTitle className="text-2xl text-white">My Wallet</CardTitle>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-400 text-sm">
                      #{wallet.userWallet?.id || '----'}
                    </p>
                    <CopyIcon
                      size={15}
                      className="cursor-pointer hover:text-gray-300"
                      title="Copy Wallet ID"
                    />
                  </div>
                </div>
              </div>

              <ReloadIcon
                onClick={handleFetchUserWallet}
                className="w-6 h-6 cursor-pointer hover:text-gray-400"
                title="Refresh Balance"
              />
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2 mt-3">
              <DollarSignIcon className="text-emerald-400" />
              <span className="text-3xl font-semibold text-white">
                ${wallet.userWallet?.balance?.toFixed(2) || '0.00'}
              </span>
            </div>

            <div className="flex gap-7 mt-8">
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 text-gray-300 hover:text-gray-100 hover:bg-[#1b1f27] flex flex-col items-center justify-center rounded-xl border border-gray-800 shadow-md transition-all">
                    <UploadIcon />
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Top-Up Wallet</DialogTitle>
                  </DialogHeader>
                  <TopUpForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 text-gray-300 hover:text-gray-100 hover:bg-[#1b1f27] flex flex-col items-center justify-center rounded-xl border border-gray-800 shadow-md transition-all">
                    <DownloadIcon />
                    <span className="text-sm mt-2">Withdraw</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Withdrawal</DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 text-gray-300 hover:text-gray-100 hover:bg-[#1b1f27] flex flex-col items-center justify-center rounded-xl border border-gray-800 shadow-md transition-all">
                    <ShuffleIcon />
                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                      Transfer To Other Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="py-5 pt-10">
          <div className="flex gap-3 items-center pb-5">
            <h1 className="text-2xl font-semibold text-white">History</h1>
            <UpdateIcon
              className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400"
              title="Refresh History"
              onClick={handleFetchWalletTransaction}
            />
          </div>

          <div className="space-y-4">
            {wallet.transactions?.length > 0 ? (
              wallet.transactions.map((item, i) => (
                <Card
                  key={i}
                  className="px-5 py-3 flex justify-between items-center border border-gray-800 bg-[#1a1d23]/80 rounded-xl shadow-md hover:bg-[#1f242c]/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="bg-[#232832] border border-gray-700">
                      <AvatarFallback>
                        <ShuffleIcon className="text-gray-400" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <h1 className="font-semibold text-gray-100">
                        {item.type || item.purpose}
                      </h1>
                      <p className="text-sm text-gray-500">{item.date || '—'}</p>
                    </div>
                  </div>

                  <div>
                    <p
                      className={`font-semibold ${
                        item.amount >= 0 ? 'text-emerald-400' : 'text-rose-500'
                      }`}
                    >
                      {item.amount} USD
                    </p>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-gray-500 italic text-center">
                No transaction history available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
