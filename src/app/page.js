import React from 'react'
import { Poppins } from 'next/font/google'
import SignUpForm from './components/SignUpForm'

const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: "400",
  variable: "--font-poppins"
})
function Page() {
  return (
    <div className={`${PoppinsFont.variable} w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 `}>
   <div className="bg-slate-900 w-full bg-gradient-to-bl from-blue-900 via-transparent to-blue-900">
    <h1 className={`font-poppins font-bold text-2xl p-10`}>Echo</h1>

    
    <p className={`font-poppins w-[100%] flex justify-center items-center text-6xl px-10 py-25`}>Welcome to the Echo bot best for your business Solutions.</p>


</div>


      <div className='bg-white w-full flex justify-center items-center'>
      
        <SignUpForm/>
      
      </div>
    </div>
  )
}

export default Page
