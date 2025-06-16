'use client';
import EnterOtp from '@/components/pages/auth/enter-otp';
import { Suspense } from 'react';
import React from 'react';

function page() {
  return (
    <Suspense>
      <EnterOtp />
    </Suspense>
  );
}

export default page;
