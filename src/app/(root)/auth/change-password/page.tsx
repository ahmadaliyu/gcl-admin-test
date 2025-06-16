'use client';
import { Suspense } from 'react';
import React from 'react';
import ChangePassword from '@/components/pages/auth/change-password/[email]';


function page() {
    return (
        <Suspense>
            <ChangePassword />
        </Suspense>
    );
}

export default page;
