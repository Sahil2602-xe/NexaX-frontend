import React from 'react'
import "./Auth.css"
import SignUpForm from './SignUpForm'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInForm from './SignInForm'

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='h-screen relative authContainer'>

      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        flex flex-col justify-center items-center 
        h-[40rem] w-[34rem] rounded-2xl z-50 
        bg-white/10 bgBlur border border-white/20 
        shadow-2xl shadow-black/50 p-10 animate-fade-in'>

        <h1 className='text-6xl font-extrabold pb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text tracking-wide drop-shadow-lg'>
          NexaX
        </h1>

        {location.pathname === "/signup" ? (
          <section className='w-full space-y-6'>
            <SignUpForm />
            <div className='flex items-center justify-center gap-2 text-sm'>
              <span className='text-gray-300'>Already have an account?</span>
              <Button 
                onClick={() => navigate("/signin")} 
                variant="link" 
                className="text-cyan-400 hover:text-purple-400 transition-colors"
              >
                Sign In
              </Button>
            </div>
          </section>
        ) : location.pathname === "/forgot-password" ? (
          <section className='w-full space-y-6'>
            <ForgotPasswordForm />
            <div className='flex items-center justify-center gap-2 text-sm'>
              <span className='text-gray-300'>Back to Login</span>
              <Button 
                onClick={() => navigate("/signin")} 
                variant="link" 
                className="text-cyan-400 hover:text-purple-400 transition-colors"
              >
                Sign In
              </Button>
            </div>
          </section>
        ) : (
          <section className='w-full space-y-6'>
            <SignInForm />
            <div className='flex items-center justify-center gap-2 text-sm'>
              <span className='text-gray-300'>Don’t have an account?</span>
              <Button 
                onClick={() => navigate("/signup")} 
                variant="link" 
                className="text-cyan-400 hover:text-purple-400 transition-colors"
              >
                Sign Up
              </Button>
            </div>

            <Button 
              onClick={() => navigate("/forgot-password")} 
              variant="outline"
              className="w-full py-5 border-cyan-400 text-cyan-300 
              hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 
              hover:text-white transition-all duration-300 ease-in-out"
            >
              Forgot Password
            </Button>
          </section>
        )}
      </div>
    </div>
  )
}

export default Auth
