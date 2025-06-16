'use client';
import { Suspense } from 'react';
import React from 'react';
import Success from '@/components/pages/(stripe)/success';

function page() {
  return (
    <Suspense>
      <Success />
    </Suspense>
  );
}

export default page;
