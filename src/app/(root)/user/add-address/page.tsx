'use client';
import { Suspense } from 'react';
import React from 'react';
import AddAddress from '@/components/pages/user/add-address';

function page() {
  return (
    <Suspense>
      <AddAddress />
    </Suspense>
  );
}

export default page;
