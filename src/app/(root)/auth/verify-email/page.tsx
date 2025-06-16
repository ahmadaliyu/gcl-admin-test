'use client';
import VerifyEmail from '@/components/pages/auth/verify-email';
import { Suspense } from 'react';
import React from 'react';

function page() {
    return (
        <Suspense>
            <VerifyEmail />
        </Suspense>
    );
}

export default page;
