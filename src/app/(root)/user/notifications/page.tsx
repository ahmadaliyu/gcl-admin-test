'use client';
import { Suspense } from 'react';
import React from 'react';
import UserNotifications from '@/components/pages/user/notifications';

function page() {
  return (
    <Suspense>
      <UserNotifications />
    </Suspense>
  );
}

export default page;
