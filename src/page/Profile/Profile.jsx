import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { VerifiedIcon } from 'lucide-react'
import AccountVerificationForm from './AccountVerificationForm'
import EditProfileForm from './EditProfileForm'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { auth } = useSelector((store) => store)
  const user = auth.user || {}

  const handleEnableTwoStepVerification = () => {
    console.log("Two Step Verification triggered")
  }

  return (
    <div className="flex flex-col items-center mb-10 text-gray-200">
      <div className="pt-10 w-full lg:w-[60%] space-y-8">

        <Card className="border border-gray-800 bg-[#0f1115]/80 shadow-lg backdrop-blur-md rounded-2xl">
          <CardHeader className="border-b border-gray-800 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-2xl text-emerald-400 font-semibold">
              Your Information
            </CardTitle>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0f1115] border border-gray-800 rounded-2xl text-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-xl text-white">
                    Edit Profile
                  </DialogTitle>
                </DialogHeader>
                <EditProfileForm />
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-5">
                <InfoRow label="Email" value={user.email} />
                <InfoRow label="Name" value={user.fullName} />
                <InfoRow label="DOB" value={user.dob} />
                <InfoRow label="Nationality" value={user.nationality || 'Indian'} />
              </div>

              <div className="space-y-5">
                <InfoRow label="Address" value={user.address} />
                <InfoRow label="City" value={user.city} />
                <InfoRow label="Postcode" value={user.postcode} />
                <InfoRow label="Country" value={user.country || 'India'} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-800 bg-[#0f1115]/80 shadow-lg backdrop-blur-md rounded-2xl">
          <CardHeader className="border-b border-gray-800 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl text-emerald-400 font-semibold">
                2-Step Verification
              </CardTitle>
              {user.twoFactorEnabled ? (
                <Badge className="bg-green-600 text-white flex items-center gap-2">
                  <VerifiedIcon size={14} />
                  Enabled
                </Badge>
              ) : (
                <Badge className="bg-orange-500 text-white">Disabled</Badge>
              )}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  {user.twoFactorEnabled ? "Manage" : "Enable Verification"}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0f1115] border border-gray-800 text-gray-200 rounded-2xl shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-white">
                    Verify Your Account
                  </DialogTitle>
                </DialogHeader>
                <AccountVerificationForm
                  handleSubmit={handleEnableTwoStepVerification}
                />
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent className="pt-6">
            <p className="text-gray-400 text-sm">
              Protect your account by enabling 2-step verification. This adds an
              extra layer of security before login or withdrawals.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

const InfoRow = ({ label, value }) => (
  <div className="flex">
    <p className="w-32 text-gray-400">{label}:</p>
    <p className="text-gray-100">{value || '—'}</p>
  </div>
)

export default Profile
