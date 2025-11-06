import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import api from "@/config/api"
import { useNavigate } from "react-router-dom"

const ForgotPasswordForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    const email = data.email.trim()
    if (!email) {
      alert("Please enter your registered email.")
      return
    }

    try {
      setLoading(true)
      const response = await api.post("/api/users/reset-password/send-otp", {
        sendTo: email,
        verificationType: "EMAIL",
      })

      alert("OTP sent successfully to your email!")
      console.log("Forgot Password Response:", response.data)

      localStorage.setItem("reset_session", response.data.session)

      navigate("/verify-otp")
    } catch (error) {
      console.error("Forgot Password Error:", error)
      alert("Failed to send OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-10 py-2">
      <h1 className="text-xl font-bold pb-3 text-center text-gray-200">
        Forgot Password
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Email</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 bg-transparent text-gray-200 p-5 placeholder:text-gray-500 focus-visible:ring-emerald-500"
                    placeholder="Enter registered email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full py-5" disabled={loading}>
            {loading ? "Sending OTP..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ForgotPasswordForm
