'use client';

import Button from '@/components/reuseables/Button';
import { CircleIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <CircleIcon className="text-red-500 w-16 h-16 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Your transaction was not completed. If this was a mistake, you can review your quote and try again.
      </p>
      <Button
        title="Back to Review"
        onClick={() => router.push('/quote-review')}
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      />
    </div>
  );
}
