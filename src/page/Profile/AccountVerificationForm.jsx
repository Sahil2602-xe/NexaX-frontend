import React, { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"

const AccountVerificationForm = () => {
  const [value, setValue] = useState("")

  const handleSubmit = () => {
    console.log("Entered OTP:", value)
  }

  return (
    <div className="flex justify-center text-gray-200">
      <div className="space-y-6 mt-6 w-full">
        {/* ====== EMAIL SECTION ====== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#1a1d23] border border-gray-800 rounded-xl px-5 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <p className="text-gray-400 text-sm sm:text-base">Email:</p>
            <p className="text-white font-medium">johndoe@gmail.com</p>
          </div>

          {/* ====== Send OTP Dialog ====== */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white mt-3 sm:mt-0">
                Send OTP
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#0f1115] border border-gray-800 rounded-2xl shadow-lg text-gray-200 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-white">
                  Enter OTP
                </DialogTitle>
              </DialogHeader>

              <div className="py-6 flex flex-col items-center space-y-8">
                {/* OTP Input */}
                <InputOTP
                  value={value}
                  onChange={(val) => setValue(val)}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {/* Submit Button */}
                <DialogClose asChild>
                  <Button
                    onClick={handleSubmit}
                    className="w-40 py-2 bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                  >
                    Submit
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default AccountVerificationForm
