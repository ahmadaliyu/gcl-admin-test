'use client';
import { Suspense } from 'react';
import React from 'react';
import QuoteReview from '@/components/pages/main/quote-review';

function page() {
  return (
    <Suspense>
      <QuoteReview />
    </Suspense>
  );
}

export default page;
