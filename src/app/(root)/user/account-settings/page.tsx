'use client';
import { Suspense } from 'react';
import React from 'react';
import UserAccountSettings from '@/components/pages/user/account-settings';

function page() {
  return (
    <Suspense>
      <UserAccountSettings />
    </Suspense>
  );
}

export default page;
