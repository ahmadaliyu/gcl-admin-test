'use client';
import { Suspense } from 'react';
import React from 'react';
import EditAddress from '@/components/pages/user/edit-address';

function page() {
  return (
    <Suspense>
      <EditAddress />
    </Suspense>
  );
}

export default page;
