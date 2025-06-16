'use client';
import { Suspense } from 'react';
import React from 'react';
import UserPaymentAndInvoices from '@/components/pages/user/my-payments-and invoices';

function page() {
  return (
    <Suspense>
      <UserPaymentAndInvoices />
    </Suspense>
  );
}

export default page;
