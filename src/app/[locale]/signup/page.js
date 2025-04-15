import { Poppins } from 'next/font/google';
import SignUpForm from '../../components/SignUpForm';
import Image from 'next/image';

const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
});

// params is already available synchronously, so no need for async
export default function SignUpPage({ params }) {
  const locale = params.locale;

  return (
    <div className={`w-full min-h-screen bg-slate-900 bg-gradient-to-bl from-blue-900 via-transparent to-blue-900 items-center text-black ${PoppinsFont.variable}`}>
      <div className="px-5 flex justify-between items-start">
        <Image src="/images/logo.png" height="180" width="180" alt="this is our logo" priority />
      </div>
      <SignUpForm locale={locale} />
    </div>
  );
}
