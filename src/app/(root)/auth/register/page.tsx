'use client';
import { Suspense } from 'react';
import React from 'react';
import RegisterPage from '@/components/pages/auth/register';

function page() {
  return (
    <Suspense>
      <RegisterPage />
    </Suspense>
  );
}

export default page;
