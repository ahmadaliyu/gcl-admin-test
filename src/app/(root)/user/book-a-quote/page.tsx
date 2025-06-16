'use client';
import { Suspense } from 'react';
import React from 'react';
import BookQuote from '@/components/pages/user/book-a-quote';

function page() {
  return (
    <Suspense>
      <BookQuote />
    </Suspense>
  );
}

export default page;
