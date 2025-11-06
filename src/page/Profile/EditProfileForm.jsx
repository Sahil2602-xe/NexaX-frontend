import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useDispatch, useSelector } from "react-redux"
import { DialogClose } from "@/components/ui/dialog"
import { updateUserProfile } from "@/state/Auth/Action" // You’ll create this action

const EditProfileForm = () => {
  const { auth } = useSelector((store) => store)
  const dispatch = useDispatch()

  const form = useForm({
    defaultValues: {
      fullName: auth.user?.fullName || "",
      dob: auth.user?.dob || "",
      nationality: auth.user?.nationality || "",
      address: auth.user?.address || "",
      city: auth.user?.city || "",
      postcode: auth.user?.postcode || "",
      country: auth.user?.country || "",
    },
  })

  const onSubmit = (data) => {
    dispatch(updateUserProfile({ jwt: localStorage.getItem("jwt"), data }))
    console.log("Updated Profile:", data)
  }

  return (
    <div className="p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 text-gray-200"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#1a1d23] border-gray-700 text-gray-100 py-6"
                    placeholder="Your full name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="bg-[#1a1d23] border-gray-700 text-gray-100 py-6"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#1a1d23] border-gray-700 text-gray-100 py-6"
                      placeholder="e.g., Indian"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#1a1d23] border-gray-700 text-gray-100 py-6"
                    placeholder="Street, area, or building"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#1a1d23] border-gray-700 text-gray-100 py-6"
                      placeholder="City name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#1a1d23] border-gray-700 text-gray-100 py-6"
                      placeholder="ZIP / PIN"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#1a1d23] border-gray-700 text-gray-100 py-6"
                      placeholder="e.g., India"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <DialogClose className="w-full">
            <Button
              type="submit"
              className="w-full py-6 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white text-lg rounded-lg transition-all"
            >
              Save Changes
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default EditProfileForm
