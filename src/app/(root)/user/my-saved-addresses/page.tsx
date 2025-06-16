'use client';
import { Suspense } from 'react';
import React from 'react';
import MySavedAddresses from '@/components/pages/user/my-saved-addresses';

function page() {
  return (
    <Suspense>
      <MySavedAddresses />
    </Suspense>
  );
}

export default page;
