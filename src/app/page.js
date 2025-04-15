import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect(`/{locale}/login`); // Redirects / to /he
}
