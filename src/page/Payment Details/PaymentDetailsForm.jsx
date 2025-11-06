import React from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addPaymentDetails } from "@/state/Withdrawal/Action"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// ✅ Schema validation (optional but recommended)
const formSchema = z
  .object({
    accountHolderName: z.string().min(2, "Account holder name is required"),
    ifscCode: z.string().min(6, "Valid IFSC code is required"),
    accountNumber: z.string().min(6, "Valid account number required"),
    confirmAccountNumber: z.string().min(6, "Please confirm account number"),
    bankName: z.string().min(2, "Bank name is required"),
    branch: z.string().optional(),
  })
  .refine((data) => data.accountNumber === data.confirmAccountNumber, {
    message: "Account numbers do not match",
    path: ["confirmAccountNumber"],
  })

const PaymentDetailsForm = () => {
  const dispatch = useDispatch()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountHolderName: "",
      ifscCode: "",
      accountNumber: "",
      confirmAccountNumber: "",
      bankName: "",
      branch: "",
    },
  })

  const onSubmit = (data) => {
    // remove confirmAccountNumber before sending
    const { confirmAccountNumber, ...finalData } = data

    dispatch(
      addPaymentDetails({
        paymentDetails: finalData,
        jwt: localStorage.getItem("jwt"),
      })
    )
    console.log("Submitted Payment Details:", finalData)
  }

  return (
    <div className="px-10 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 text-gray-100"
        >
          {/* Account Holder */}
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-700 bg-transparent text-white p-5"
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IFSC Code */}
          <FormField
            control={form.control}
            name="ifscCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-700 bg-transparent text-white p-5"
                    placeholder="YESB0001234"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Account Number */}
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-700 bg-transparent text-white p-5"
                    placeholder="1234567890"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Account Number */}
          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Account Number</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-700 bg-transparent text-white p-5"
                    placeholder="Same as above"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bank Name */}
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-700 bg-transparent text-white p-5"
                    placeholder="YES BANK"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Branch */}
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-700 bg-transparent text-white p-5"
                    placeholder="Ghatkopar"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose className="w-full">
            <Button
              type="submit"
              className="w-full py-5 text-lg bg-emerald-500 hover:bg-emerald-600"
            >
              Save Details
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default PaymentDetailsForm
