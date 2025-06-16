'use client';
import { Suspense } from 'react';
import React from 'react';
import UserSupportAndHelpCenter from '@/components/pages/user/support-and-help-center';

function page() {
  return (
    <Suspense>
      <UserSupportAndHelpCenter />
    </Suspense>
  );
}

export default page;
