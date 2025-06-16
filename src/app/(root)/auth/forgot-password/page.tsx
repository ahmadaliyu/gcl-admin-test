'use client';
import { Suspense } from 'react';
import React from 'react';
import ForgotPasswordPage from '@/components/pages/auth/forgot-password';

function page() {
  return (
    <Suspense>
      <ForgotPasswordPage />
    </Suspense>
  );
}

export default page;
