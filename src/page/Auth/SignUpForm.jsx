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
import React from 'react'
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { register } from "@/state/Auth/Action"
import { useNavigate } from "react-router-dom" 
import { toast } from "sonner" 

const SignUpForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const form = useForm({
    resolver: "",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data) => {
    try {

      const res = await dispatch(register(data))

      toast.success("Registered successfully! Please login to continue.")
      navigate("/signin")
    } catch (error) {
      console.log(error)
      toast.error("Registration failed. Try again.")
    }
  }

  return (
    <div className="px-10 py-2">
      <h1 className="text-2xl font-extrabold pb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Create New Account
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Full Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full py-4 px-5 rounded-lg border border-gray-700 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full py-4 px-5 rounded-lg border border-gray-700 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="email@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="w-full py-4 px-5 rounded-lg border border-gray-700 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-5 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/30"
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignUpForm
