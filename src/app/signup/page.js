import { Poppins } from 'next/font/google';
import SignUpForm from '../components/SignUpForm';



const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: "400",
  variable: "--font-poppins"
})

export default function SignUpPage() {


  

  return (
    <div className={`w-full min-h-screen bg-slate-900 bg-gradient-to-bl from-blue-900 via-transparent to-blue-900 items-center text-black ${PoppinsFont.variable}  `}>
          <h1 className={`font-poppins font-bold text-2xl p-10 text-white `}>Echo</h1>
         <SignUpForm/>
    </div>
   
  );
}
