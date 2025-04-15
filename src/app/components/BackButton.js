'use client';

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-4 left-4 z-50 px-4  rounded  text-white hover:bg-gray-700 transition "
    >
      ← Back
    </button>
  );
};

export default BackButton;
