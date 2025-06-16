'use client';
import { Suspense } from 'react';
import React from 'react';
import DashboardOverview from '@/components/pages/user/overview';

function page() {
  return (
    <Suspense>
      <DashboardOverview />
    </Suspense>
  );
}

export default page;
