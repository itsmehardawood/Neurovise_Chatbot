'use client'

import { Poppins } from 'next/font/google'
import LoginForm from '@/app/components/LoginForm'
import Image from 'next/image'
import { useTranslation } from '@/lib/translations'
import { useParams } from 'next/navigation'

const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
})

export default function Page() {
  const { locale } = useParams()  // gets the locale from the dynamic route
  const t = useTranslation(locale || 'he')

  return (
    <div className={`${PoppinsFont.variable} w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2`}>
      {/* Left Section */}
      <div className="bg-slate-900 w-full bg-gradient-to-bl from-blue-900 via-transparent to-blue-900 rtl:bg-gradient-to-br">
        <div className="px-5 flex justify-between items-start">
          <Image src="/images/logo.png" height="180" width="180" alt="this is our logo" priority />
          <div className='p-5'>
          </div>
        </div>
        <p className="font-poppins w-full flex justify-center items-center text-6xl px-10 py-25 rtl:text-right ltr:text-left">
          {t('welcomeMessage')}
        </p>
      </div>

      {/* Right Section */}
      <div className="bg-white w-full flex justify-center items-center">
        <LoginForm locale={locale} />
      </div>
    </div>
  )
}