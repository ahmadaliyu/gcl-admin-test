'use client';
import { Suspense } from 'react';
import React from 'react';
import Homepage from '@/components/pages/main/homepage';

function page() {
  return (
    <Suspense>
      <Homepage />
    </Suspense>
  );
}

export default page;
