'use client';
import { Suspense } from 'react';
import React from 'react';
import GetAQuote from '@/components/pages/main/get-a-quote/[quote]';

function page() {
  return (
    <Suspense>
      <GetAQuote />
    </Suspense>
  );
}

export default page;
