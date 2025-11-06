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
import { login } from "@/state/Auth/Action"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const SignInForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const form = useForm({
    resolver: "",
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(login({ data, navigate }))

      const jwt = localStorage.getItem("jwt")
      if (!jwt) {
        toast.error("Login failed. Please try again.")
        return
      }

      const userRes = await fetch("http://localhost:5454/api/users/profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      const user = await userRes.json()

      if (user.role === "ROLE_ADMIN") {
        toast.success("Welcome Admin ")
        navigate("/admin/withdrawals")
      } else {
        toast.success("Logged in successfully ")
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      toast.error("Invalid email or password.")
    }
  }

  return (
    <div className='px-10 py-2'>
      <h1 className="text-2xl font-extrabold pb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Log In
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="email@gmail.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="border w-full border-gray-700 p-5"
                    placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full py-5">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignInForm
