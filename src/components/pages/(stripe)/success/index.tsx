'use client';

import Button from '@/components/reuseables/Button';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <CheckCircledIcon className="text-green-500 w-16 h-16 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Your booking has been successfully submitted. You can now manage your orders from the dashboard.
      </p>
      <Button
        title="Go to Dashboard"
        onClick={() => router.push('/user/overview')}
        variant="blue"
        className="rounded-lg"
      />
    </div>
  );
}
