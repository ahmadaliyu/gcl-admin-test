'use client';
import { Suspense } from 'react';
import React from 'react';
import LoginPage from '@/components/pages/auth/login';

function page() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}

export default page;
