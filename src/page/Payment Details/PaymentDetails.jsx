import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React, { useEffect } from 'react'
import PaymentDetailsForm from './PaymentDetailsForm'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentDetails } from '@/state/Withdrawal/Action'

const PaymentDetails = () => {
  const { withdrawal } = useSelector((store) => store)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem('jwt') }))
  }, [dispatch])

  const details = withdrawal?.paymentDetails

  return (
    <div className="px-6 lg:px-20 py-10 text-gray-200">
      <h1 className="text-3xl font-bold mb-10 text-white">Payment Details</h1>

      {/* ======== EXISTING PAYMENT DETAILS ======== */}
      {details ? (
        <Card className="border border-gray-800 bg-[#0f1115]/80 shadow-lg backdrop-blur-sm rounded-2xl transition-all hover:shadow-emerald-900/10 hover:border-emerald-500/20">
          <CardHeader className="pb-6 border-b border-gray-800">
            <CardTitle className="text-2xl text-emerald-400">
              {details.bankName || 'Bank Account'}
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              A/C No.:{' '}
              <span className="text-gray-300 font-medium">
                {details.accountNumber
                  ? '********' + details.accountNumber.slice(-4)
                  : '—'}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-5 space-y-3">
            <div className="flex items-center">
              <p className="w-32 text-gray-400">Account Holder</p>
              <p className="text-gray-100 font-medium">
                : {details.accountHolderName || 'N/A'}
              </p>
            </div>
            <div className="flex items-center">
              <p className="w-32 text-gray-400">Bank</p>
              <p className="text-gray-100 font-medium">
                : {details.bankName || 'N/A'}
              </p>
            </div>
            <div className="flex items-center">
              <p className="w-32 text-gray-400">IFSC Code</p>
              <p className="text-gray-100 font-medium">
                : {details.ifscCode || 'N/A'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* ======== ADD PAYMENT DETAILS BUTTON ======== */
        <div className="flex flex-col items-center justify-center border border-dashed border-gray-700 bg-[#1a1d23]/60 py-16 rounded-2xl">
          <p className="text-gray-400 mb-6 text-center">
            You haven’t added your bank details yet.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-8 py-6 text-lg font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all">
                Add Payment Details
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0f1115] border border-gray-800 text-gray-200 rounded-2xl shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-white">
                  Add Your Bank Details
                </DialogTitle>
              </DialogHeader>
              <PaymentDetailsForm />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

export default PaymentDetails
