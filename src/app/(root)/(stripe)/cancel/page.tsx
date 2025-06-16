'use client';
import { Suspense } from 'react';
import React from 'react';
import Cancel from '@/components/pages/(stripe)/cancel';

function page() {
  return (
    <Suspense>
      <Cancel />
    </Suspense>
  );
}

export default page;
